-- =========================================================
-- Maintenance Service Database
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- Enums
-- =========================================================

CREATE TYPE plan_type AS ENUM (
    'maintenance',
    'repair'
);


CREATE TYPE plan_status AS ENUM (
    'not_started',
    'ongoing',
    'completed',
    'cancelled'
);


CREATE TYPE request_status AS ENUM (
    'pending',
    'success',
    'fail'
);


CREATE TYPE repair_priority AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);


CREATE TYPE repair_action AS ENUM (
    'normal_repair',
    'send_warranty',
    'request_parts',
    'dispose'
);


CREATE TYPE maintenance_request_type AS ENUM (
    'send_warranty',
    'dispose'
);


CREATE TYPE maintenance_history_type AS ENUM (
    'maintenance',
    'repair',
    'dispose'
);


CREATE TYPE employee_availability_status AS ENUM (
    'available',
    'unavailable'
);


-- =========================================================
-- Repairs
-- =========================================================
-- Repair is created before a plan.
-- plan_id therefore belongs to plans, not repairs.
-- =========================================================

CREATE TABLE repairs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    device_id BIGINT NOT NULL,

    request_name VARCHAR(150) NOT NULL
        DEFAULT 'YÊU CẦU SỬA CHỮA',

    priority repair_priority NOT NULL DEFAULT 'medium',

    description TEXT,

    status request_status NOT NULL DEFAULT 'pending',

    approved_by_employee_id BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Plans
-- =========================================================

CREATE TABLE plans (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    repair_id BIGINT,

    created_by_employee_id BIGINT NOT NULL,

    device_id BIGINT NOT NULL,

    plan_type plan_type NOT NULL DEFAULT 'maintenance',

    description TEXT,

    estimated_cost NUMERIC(18, 2),

    planned_start_at TIMESTAMPTZ NOT NULL,
    planned_end_at TIMESTAMPTZ NOT NULL,

    actual_start_at TIMESTAMPTZ,
    actual_end_at TIMESTAMPTZ,

    status plan_status NOT NULL DEFAULT 'not_started',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_plans_repair
        FOREIGN KEY (repair_id)
        REFERENCES repairs(id),

    CONSTRAINT chk_plans_estimated_cost
        CHECK (
            estimated_cost IS NULL
            OR estimated_cost >= 0
        ),

    CONSTRAINT chk_plans_planned_period
        CHECK (
            planned_end_at >= planned_start_at
        ),

    CONSTRAINT chk_plans_actual_period
        CHECK (
            actual_end_at IS NULL
            OR actual_start_at IS NULL
            OR actual_end_at >= actual_start_at
        )
);


-- =========================================================
-- Plan Assignments
-- =========================================================
-- employee_id is a logical reference to user-service.
-- No cross-database foreign key.
-- =========================================================

CREATE TABLE plan_assignments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    plan_id BIGINT NOT NULL,

    employee_id BIGINT NOT NULL,

    availability_status employee_availability_status
        NOT NULL DEFAULT 'available',

    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_plan_assignments_plan
        FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_plan_assignments_plan_employee
        UNIQUE (plan_id, employee_id)
);


-- =========================================================
-- Damage Reports
-- =========================================================

CREATE TABLE damage_reports (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    plan_id BIGINT NOT NULL,

    report_name VARCHAR(150) NOT NULL
        DEFAULT 'BIÊN BẢN XÁC ĐỊNH HƯ HỎNG',

    description TEXT,

    solution TEXT,

    repair_action repair_action NOT NULL DEFAULT 'normal_repair',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_damage_reports_plan
        FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE CASCADE
);


-- =========================================================
-- Acceptance Reports
-- =========================================================
-- A plan may have multiple acceptance reports.
-- Example:
--   report 1 -> fail
--   report 2 -> fail
--   report 3 -> success
-- =========================================================

CREATE TABLE acceptance_reports (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    plan_id BIGINT NOT NULL,

    report_name VARCHAR(150) NOT NULL
        DEFAULT 'BIÊN BẢN NGHIỆM THU',

    description TEXT,

    review TEXT,

    status request_status NOT NULL DEFAULT 'pending',

    approved_by_employee_id BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_acceptance_reports_plan
        FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE CASCADE
);


-- =========================================================
-- Adjust Plans
-- =========================================================

CREATE TABLE adjust_plans (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    plan_id BIGINT NOT NULL,

    request_name VARCHAR(150) NOT NULL
        DEFAULT 'YÊU CẦU ĐIỀU CHỈNH KẾ HOẠCH BẢO TRÌ',

    reason TEXT,

    suggestion TEXT,

    status request_status NOT NULL DEFAULT 'pending',

    approved_by_employee_id BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_adjust_plans_plan
        FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE CASCADE
);


-- =========================================================
-- Maintenance Requests
-- =========================================================

CREATE TABLE maintenance_requests (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    plan_id BIGINT NOT NULL,

    request_type maintenance_request_type NOT NULL,

    reason TEXT,

    status request_status NOT NULL DEFAULT 'pending',

    approved_by_employee_id BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_maintenance_requests_plan
        FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE CASCADE
);


-- =========================================================
-- Maintenance Histories
-- =========================================================

CREATE TABLE maintenance_histories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    plan_id BIGINT NOT NULL,

    created_by_employee_id BIGINT NOT NULL,

    started_at TIMESTAMPTZ NOT NULL,

    ended_at TIMESTAMPTZ,

    old_state VARCHAR(50) NOT NULL,

    new_state VARCHAR(50) NOT NULL,

    description TEXT,

    budget NUMERIC(18, 2),

    history_type maintenance_history_type,

    suggestion TEXT,

    suggestion_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_maintenance_histories_plan
        FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_maintenance_histories_period
        CHECK (
            ended_at IS NULL
            OR ended_at >= started_at
        ),

    CONSTRAINT chk_maintenance_histories_budget
        CHECK (
            budget IS NULL
            OR budget >= 0
        )
);


-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_repairs_device
ON repairs(device_id);

CREATE INDEX idx_repairs_created_by_employee
ON repairs(created_by_employee_id);

CREATE INDEX idx_repairs_status
ON repairs(status);

CREATE INDEX idx_plans_repair
ON plans(repair_id);

CREATE INDEX idx_plans_device
ON plans(device_id);

CREATE INDEX idx_plans_created_by_employee
ON plans(created_by_employee_id);

CREATE INDEX idx_plans_status
ON plans(status);

CREATE INDEX idx_plans_type_status
ON plans(plan_type, status);

CREATE INDEX idx_plan_assignments_employee
ON plan_assignments(employee_id);

CREATE INDEX idx_damage_reports_plan
ON damage_reports(plan_id);

CREATE INDEX idx_acceptance_reports_plan
ON acceptance_reports(plan_id);

CREATE INDEX idx_acceptance_reports_status
ON acceptance_reports(status);

CREATE INDEX idx_adjust_plans_plan
ON adjust_plans(plan_id);

CREATE INDEX idx_adjust_plans_status
ON adjust_plans(status);

CREATE INDEX idx_maintenance_requests_plan
ON maintenance_requests(plan_id);

CREATE INDEX idx_maintenance_requests_type_status
ON maintenance_requests(request_type, status);

CREATE INDEX idx_maintenance_histories_plan
ON maintenance_histories(plan_id, created_at);


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

CREATE TRIGGER trg_repairs_updated_at
BEFORE UPDATE ON repairs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_plans_updated_at
BEFORE UPDATE ON plans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_plan_assignments_updated_at
BEFORE UPDATE ON plan_assignments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_damage_reports_updated_at
BEFORE UPDATE ON damage_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_acceptance_reports_updated_at
BEFORE UPDATE ON acceptance_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_adjust_plans_updated_at
BEFORE UPDATE ON adjust_plans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_maintenance_requests_updated_at
BEFORE UPDATE ON maintenance_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();