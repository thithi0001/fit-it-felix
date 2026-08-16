CREATE OR REPLACE FUNCTION public.trg_devices_state_transition_func()
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
BEGIN
    -- Chỉ kiểm tra và ghi log khi trường 'state' thực sự thay đổi
    IF OLD.state IS DISTINCT FROM NEW.state THEN
        
        -- Kiểm soát các bước chuyển trạng thái hợp lệ (State Machine)
        -- Dựa theo bảng đặc tả: available, in_use, broken, under_maintenance, awaiting_parts, under_warranty, testing, awaiting_disposal, disposed
        IF OLD.state = 'available' AND NEW.state NOT IN ('in_use', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'in_use' AND NEW.state NOT IN ('available', 'broken', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'broken' AND NEW.state NOT IN ('under_maintenance', 'awaiting_parts', 'under_warranty', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'under_maintenance' AND NEW.state NOT IN ('awaiting_parts', 'under_warranty', 'testing', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'awaiting_parts' AND NEW.state NOT IN ('under_maintenance', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'under_warranty' AND NEW.state NOT IN ('available', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'testing' AND NEW.state NOT IN ('in_use', 'broken', 'awaiting_disposal') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'awaiting_disposal' AND NEW.state NOT IN ('disposed') THEN
            RAISE EXCEPTION 'Trạng thái thiết bị không thể chuyển từ % sang %', OLD.state, NEW.state;
            
        ELSIF OLD.state = 'disposed' THEN
            RAISE EXCEPTION 'Thiết bị đã thanh lý (disposed), không thể thay đổi trạng thái khác.';
        END IF;

        -- Tự động ghi nhận lịch sử thay đổi trạng thái vào bảng device_state_histories
        INSERT INTO public.device_state_histories (device_id, old_state, new_state, created_at)
        VALUES (NEW.id, OLD.state, NEW.state, NOW());
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_device_state_transition ON public.devices;

CREATE TRIGGER trg_enforce_device_state_transition
    BEFORE UPDATE ON public.devices
    FOR EACH ROW
    EXECUTE FUNCTION public.trg_devices_state_transition_func();