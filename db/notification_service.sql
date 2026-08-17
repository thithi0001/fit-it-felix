-- =========================================================
-- Notification Service Database
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- Enums
-- =========================================================

CREATE TYPE notification_type AS ENUM (
    'acceptance_report',
    'damage_report',
    'device_request',
    'inventory_request',
    'maintenance_request',
    'repair_request',
    'plan_schedule',
    'approval',
    'system',
    'test'
);


-- =========================================================
-- Notifications
-- =========================================================

CREATE TABLE notifications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    notification_type notification_type NOT NULL,

    title VARCHAR(255) NOT NULL,

    content TEXT NOT NULL,

    reference_type VARCHAR(100),

    reference_id BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Notification Users
-- =========================================================
-- employee_id is a logical reference to user-service.
-- No cross-database foreign key is created.
-- =========================================================

CREATE TABLE noti_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    notification_id BIGINT NOT NULL,

    employee_id BIGINT NOT NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    read_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_noti_users_notification
        FOREIGN KEY (notification_id)
        REFERENCES notifications(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_noti_users_notification_employee
        UNIQUE (notification_id, employee_id),

    CONSTRAINT chk_noti_users_read_at
        CHECK (
            (is_read = FALSE AND read_at IS NULL)
            OR
            (is_read = TRUE AND read_at IS NOT NULL)
        )
);


-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_notifications_created_by_employee
ON notifications(created_by_employee_id);

CREATE INDEX idx_notifications_type
ON notifications(notification_type);

CREATE INDEX idx_notifications_reference
ON notifications(reference_type, reference_id);

CREATE INDEX idx_noti_users_employee
ON noti_users(employee_id);

CREATE INDEX idx_noti_users_employee_read
ON noti_users(employee_id, is_read);

CREATE INDEX idx_noti_users_notification
ON noti_users(notification_id);


-- =========================================================
-- Automatic updated_at
-- =========================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


CREATE TRIGGER trg_notifications_updated_at
BEFORE UPDATE ON notifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();