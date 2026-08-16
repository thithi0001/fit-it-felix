CREATE OR REPLACE FUNCTION fn_devices_before_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Nếu chưa xác định nguyên giá thì dùng giá mua
    IF NEW.original_cost IS NULL THEN
        NEW.original_cost := NEW.purchase_price;
    END IF;

    -- Mặc định ngày bắt đầu khấu hao là ngày đưa vào sử dụng
    IF NEW.depreciation_start_date IS NULL THEN
        NEW.depreciation_start_date := NEW.purchase_date;
    END IF;

    -- Thiết bị mới chưa có khấu hao
    IF NEW.accumulated_depreciation IS NULL THEN
        NEW.accumulated_depreciation := 0;
    END IF;

    -- Giá trị còn lại ban đầu bằng nguyên giá
    NEW.book_value := NEW.original_cost;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_devices_before_insert
BEFORE INSERT ON devices
FOR EACH ROW
EXECUTE FUNCTION fn_devices_before_insert();

CREATE OR REPLACE FUNCTION fn_devices_before_update()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Không cho phép khấu hao lũy kế âm
    IF NEW.accumulated_depreciation < 0 THEN
        RAISE EXCEPTION
            'Accumulated depreciation cannot be negative';
    END IF;

    -- Không cho phép khấu hao lũy kế vượt nguyên giá
    IF NEW.accumulated_depreciation > NEW.original_cost THEN
        RAISE EXCEPTION
            'Accumulated depreciation (%) cannot exceed original cost (%)',
            NEW.accumulated_depreciation,
            NEW.original_cost;
    END IF;

    -- Tự động tính lại giá trị còn lại
    NEW.book_value :=
        NEW.original_cost - NEW.accumulated_depreciation;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_devices_before_update
BEFORE UPDATE OF
    original_cost,
    accumulated_depreciation
ON devices
FOR EACH ROW
EXECUTE FUNCTION fn_devices_before_update();

CREATE OR REPLACE FUNCTION fn_devices_validate_depreciation_period()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_min_months INTEGER;
    v_max_months INTEGER;
BEGIN
    -- Nếu chưa thiết lập thời gian khấu hao thì bỏ qua
    IF NEW.depreciation_period_months IS NULL THEN
        RETURN NEW;
    END IF;

    SELECT
        depreciation_period_min_months,
        depreciation_period_max_months
    INTO
        v_min_months,
        v_max_months
    FROM categories
    WHERE id = NEW.category_id;

    -- Kiểm tra category tồn tại
    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Category % does not exist',
            NEW.category_id;
    END IF;

    -- Kiểm tra thời gian tối thiểu
    IF v_min_months IS NOT NULL
       AND NEW.depreciation_period_months < v_min_months THEN

        RAISE EXCEPTION
            'Depreciation period (%) is less than category minimum (%)',
            NEW.depreciation_period_months,
            v_min_months;
    END IF;

    -- Kiểm tra thời gian tối đa
    IF v_max_months IS NOT NULL
       AND NEW.depreciation_period_months > v_max_months THEN

        RAISE EXCEPTION
            'Depreciation period (%) exceeds category maximum (%)',
            NEW.depreciation_period_months,
            v_max_months;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_devices_validate_depreciation_period
BEFORE INSERT OR UPDATE OF
    category_id,
    depreciation_period_months
ON devices
FOR EACH ROW
EXECUTE FUNCTION fn_devices_validate_depreciation_period();