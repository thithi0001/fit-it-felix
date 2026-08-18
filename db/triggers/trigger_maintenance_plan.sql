-- =========================================================
-- FUNCTION: validate_plan_status_transition
-- =========================================================

CREATE OR REPLACE FUNCTION validate_plan_status_transition()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Không thay đổi status
    IF OLD.status = NEW.status THEN
        RETURN NEW;
    END IF;

    -- ==========================================
    -- not_started -> ongoing
    -- not_started -> cancelled
    -- ==========================================
    IF OLD.status = 'not_started' THEN

        IF NEW.status NOT IN ('ongoing', 'cancelled') THEN
            RAISE EXCEPTION
                'Không thể chuyển kế hoạch từ % sang %',
                OLD.status,
                NEW.status;
        END IF;

    -- ==========================================
    -- ongoing -> completed
    -- ongoing -> cancelled
    -- ==========================================
    ELSIF OLD.status = 'ongoing' THEN

        IF NEW.status NOT IN ('completed', 'cancelled') THEN
            RAISE EXCEPTION
                'Không thể chuyển kế hoạch từ % sang %',
                OLD.status,
                NEW.status;
        END IF;

    -- ==========================================
    -- completed / cancelled là trạng thái kết thúc
    -- ==========================================
    ELSIF OLD.status IN ('completed', 'cancelled') THEN

        RAISE EXCEPTION
            'Kế hoạch đã ở trạng thái kết thúc %, không thể chuyển sang %',
            OLD.status,
            NEW.status;

    END IF;

    RETURN NEW;
END;
$$;


-- =========================================================
-- TRIGGER
-- =========================================================

CREATE TRIGGER trg_validate_plan_status_transition
BEFORE UPDATE OF status
ON plans
FOR EACH ROW
EXECUTE FUNCTION validate_plan_status_transition();