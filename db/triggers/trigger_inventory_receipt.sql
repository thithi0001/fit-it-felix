CREATE OR REPLACE FUNCTION public.trg_update_inventory_on_receipt_func()
RETURNS TRIGGER AS $$
DECLARE
    v_supplier_id BIGINT;
BEGIN
    -- Lấy supplier_id từ bảng receipts dựa vào receipt_id của receipt_details mới thêm
    SELECT supplier_id INTO v_supplier_id
    FROM public.receipts
    WHERE id = NEW.receipt_id;

    -- Kiểm tra xem trong kho (inventory) đã tồn tại item của nhà cung cấp này chưa
    IF EXISTS (
        SELECT 1 FROM public.inventory 
        WHERE item_id = NEW.item_id AND supplier_id = v_supplier_id
    ) THEN
        -- Nếu đã có, tiến hành cộng thêm số lượng mới nhập
        UPDATE public.inventory
        SET quantity = quantity + NEW.quantity,
            updated_at = NOW()
        WHERE item_id = NEW.item_id AND supplier_id = v_supplier_id;
    ELSE
        -- Nếu chưa có, tạo mới bản ghi tồn kho cho item và supplier đó
        INSERT INTO public.inventory (item_id, supplier_id, quantity, created_at, updated_at)
        VALUES (NEW.item_id, v_supplier_id, NEW.quantity, NOW(), NOW());
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_insert_receipt_details ON public.receipt_details;

CREATE TRIGGER trg_after_insert_receipt_details
    AFTER INSERT ON public.receipt_details
    FOR EACH ROW
    EXECUTE FUNCTION public.trg_update_inventory_on_receipt_func();