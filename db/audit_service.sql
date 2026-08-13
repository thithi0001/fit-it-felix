-- =========================================================
-- Audit Service Database
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- Audit Logs
-- =========================================================

CREATE TABLE audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    actor_employee_id BIGINT NOT NULL,

    actor_name VARCHAR(100),

    action VARCHAR(50) NOT NULL,

    service_name VARCHAR(100) NOT NULL,

    table_name VARCHAR(100) NOT NULL,

    record_id BIGINT,

    old_value JSONB,

    new_value JSONB,

    ip_address INET,

    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_audit_logs_actor_employee
ON audit_logs(actor_employee_id);


CREATE INDEX idx_audit_logs_service_name
ON audit_logs(service_name);


CREATE INDEX idx_audit_logs_table_record
ON audit_logs(table_name, record_id);


CREATE INDEX idx_audit_logs_action
ON audit_logs(action);


CREATE INDEX idx_audit_logs_created_at
ON audit_logs(created_at);