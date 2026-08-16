CREATE OR REPLACE FUNCTION public.trg_update_noti_users_read_at_func()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
    -- Chỉ xử lý khi trường 'is_read' thực sự thay đổi
    IF OLD.is_read IS DISTINCT FROM NEW.is_read THEN
        IF NEW.is_read = TRUE THEN
            -- Nếu chuyển sang đã đọc và trước đó chưa có thời gian đọc, gán thời gian hiện tại
            NEW.read_at := COALESCE(NEW.read_at, NOW());
        ELSE
            -- Nếu đánh dấu là chưa đọc, xóa thời gian đọc
            NEW.read_at := NULL;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_noti_users_read_at ON public.noti_users;

CREATE TRIGGER trg_enforce_noti_users_read_at
    BEFORE UPDATE ON public.noti_users
    FOR EACH ROW
    EXECUTE FUNCTION public.trg_update_noti_users_read_at_func();