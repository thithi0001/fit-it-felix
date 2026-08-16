-- =========================================================
-- Device Service Database
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- Extensions
-- =========================================================

CREATE EXTENSION IF NOT EXISTS btree_gist;


-- =========================================================
-- Enums
-- =========================================================

CREATE TYPE device_state AS ENUM (
    'available',
    'in_use',
    'broken',
    'under_maintenance',
    'awaiting_parts',
    'under_warranty',
    'testing',
    'awaiting_disposal',
    'disposed'
);


CREATE TYPE request_status AS ENUM (
    'pending',
    'success',
    'fail'
);


CREATE TYPE device_request_type AS ENUM (
    'return',
    'retrieval'
);


CREATE TYPE depreciation_method AS ENUM (
    'straight_line'
);


-- =========================================================
-- Categories
-- =========================================================

CREATE TABLE categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,

    -- Khung thời gian khấu hao theo loại thiết bị
    depreciation_period_min_months INTEGER,
    depreciation_period_max_months INTEGER,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_categories_depreciation_period
        CHECK (
            depreciation_period_min_months IS NULL
            OR depreciation_period_min_months > 0
        ),

    CONSTRAINT chk_categories_depreciation_period_range
        CHECK (
            depreciation_period_max_months IS NULL
            OR depreciation_period_min_months IS NULL
            OR depreciation_period_max_months >= depreciation_period_min_months
        )
);


-- =========================================================
-- Devices
-- =========================================================

CREATE TABLE devices (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    category_id BIGINT NOT NULL,

    device_code VARCHAR(50) NOT NULL UNIQUE,
    device_name VARCHAR(150) NOT NULL,

    serial_number VARCHAR(100) NOT NULL UNIQUE,
    model VARCHAR(100),

    manufacturer_name VARCHAR(150),
    supplier_name VARCHAR(150),

    manufacture_date DATE,

    purchase_date DATE NOT NULL,
    purchase_price NUMERIC(18, 2) NOT NULL,

    -- Nguyên giá TSCĐ dùng làm cơ sở tính khấu hao
    original_cost NUMERIC(18, 2) NOT NULL,

    warranty_start_date DATE,
    warranty_end_date DATE,

    specifications TEXT,

    state device_state NOT NULL DEFAULT 'available',

    -- =====================================================
    -- Depreciation
    -- =====================================================

    depreciation_method depreciation_method NOT NULL
        DEFAULT 'straight_line',

    depreciation_start_date DATE,

    -- Thời gian khấu hao thực tế của thiết bị,
    -- phải nằm trong khoảng của category
    depreciation_period_months INTEGER,

    -- Tổng khấu hao đã trích
    accumulated_depreciation NUMERIC(18, 2) NOT NULL DEFAULT 0,

    -- Giá trị còn lại = original_cost - accumulated_depreciation
    book_value NUMERIC(18, 2) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_devices_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id),

    CONSTRAINT chk_devices_purchase_price
        CHECK (
            purchase_price >= 0
        ),

    CONSTRAINT chk_devices_original_cost
        CHECK (
            original_cost >= 0
        ),

    CONSTRAINT chk_devices_accumulated_depreciation
        CHECK (
            accumulated_depreciation >= 0
            AND accumulated_depreciation <= original_cost
        ),

    CONSTRAINT chk_devices_book_value
        CHECK (
            book_value >= 0
            AND book_value <= original_cost
        ),

    CONSTRAINT chk_devices_depreciation_period
        CHECK (
            depreciation_period_months IS NULL
            OR depreciation_period_months > 0
        ),

    CONSTRAINT chk_devices_depreciation_start_date
        CHECK (
            depreciation_start_date IS NULL
            OR depreciation_start_date >= purchase_date
        ),

    CONSTRAINT chk_devices_warranty_period
        CHECK (
            warranty_end_date IS NULL
            OR warranty_start_date IS NULL
            OR warranty_end_date >= warranty_start_date
        )
);


-- =========================================================
-- Employee Devices
-- =========================================================
-- employee_id is a logical reference to user-service.
-- No cross-database foreign key is created.
--
-- A device cannot be assigned to multiple employees
-- during overlapping periods.
-- =========================================================

CREATE TABLE employee_devices (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    device_id BIGINT NOT NULL,

    employee_id BIGINT NOT NULL,

    assigned_at TIMESTAMPTZ NOT NULL,

    returned_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_employee_devices_device
        FOREIGN KEY (device_id)
        REFERENCES devices(id),

    CONSTRAINT chk_employee_devices_period
        CHECK (
            returned_at IS NULL
            OR returned_at > assigned_at
        )
);


ALTER TABLE employee_devices
ADD CONSTRAINT employee_devices_no_overlapping_assignment
EXCLUDE USING gist (
    device_id WITH =,
    tstzrange(
        assigned_at,
        COALESCE(returned_at, 'infinity'::timestamptz),
        '[)'
    ) WITH &&
);


-- =========================================================
-- Assign Requests
-- =========================================================

CREATE TABLE assign_requests (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    request_name VARCHAR(150) NOT NULL,

    reason TEXT,

    status request_status NOT NULL DEFAULT 'pending',

    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Assign Request Details
-- =========================================================

CREATE TABLE assign_request_details (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    assign_request_id BIGINT NOT NULL,

    category_id BIGINT NOT NULL,

    requested_quantity INTEGER NOT NULL,

    approved_quantity INTEGER NOT NULL DEFAULT 0,

    approved_at TIMESTAMPTZ,

    approved_by_employee_id BIGINT,

    received_at TIMESTAMPTZ,

    status request_status NOT NULL DEFAULT 'pending',

    CONSTRAINT fk_assign_request_details_request
        FOREIGN KEY (assign_request_id)
        REFERENCES assign_requests(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assign_request_details_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id),

    CONSTRAINT chk_assign_request_details_requested_quantity
        CHECK (requested_quantity > 0),

    CONSTRAINT chk_assign_request_details_approved_quantity
        CHECK (
            approved_quantity >= 0
            AND approved_quantity <= requested_quantity
        )
);


-- =========================================================
-- Device Requests
-- =========================================================

CREATE TABLE device_requests (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,

    request_name VARCHAR(150) NOT NULL,

    request_type device_request_type NOT NULL,

    reason TEXT,

    status request_status NOT NULL DEFAULT 'pending',

    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Device Request Details
-- =========================================================

CREATE TABLE device_request_details (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    device_request_id BIGINT NOT NULL,

    device_id BIGINT NOT NULL,

    status request_status NOT NULL DEFAULT 'pending',

    approved_at TIMESTAMPTZ,

    approved_by_employee_id BIGINT,

    handover_requested_at TIMESTAMPTZ,

    handed_over_at TIMESTAMPTZ,

    CONSTRAINT fk_device_request_details_request
        FOREIGN KEY (device_request_id)
        REFERENCES device_requests(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_device_request_details_device
        FOREIGN KEY (device_id)
        REFERENCES devices(id)
);


-- =========================================================
-- Device State Histories
-- =========================================================

CREATE TABLE device_state_histories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    device_id BIGINT NOT NULL,

    old_state device_state NOT NULL,

    new_state device_state NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_device_state_histories_device
        FOREIGN KEY (device_id)
        REFERENCES devices(id)
);


-- =========================================================
-- Device Disposals
-- =========================================================

CREATE TABLE device_disposals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    device_id BIGINT NOT NULL UNIQUE,
    
    created_by_employee_id BIGINT NOT NULL,

    actual_disposal_date DATE,

    actual_disposal_value NUMERIC(18, 2),

    reason TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_device_disposals_device
        FOREIGN KEY (device_id)
        REFERENCES devices(id),

    CONSTRAINT chk_device_disposals_actual_value
        CHECK (
            actual_disposal_value IS NULL
            OR actual_disposal_value >= 0
        )
);


-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_devices_category
ON devices(category_id);

CREATE INDEX idx_devices_state
ON devices(state);

CREATE INDEX idx_employee_devices_employee
ON employee_devices(employee_id);

CREATE INDEX idx_employee_devices_device
ON employee_devices(device_id);

CREATE INDEX idx_assign_requests_created_by_employee
ON assign_requests(created_by_employee_id);

CREATE INDEX idx_assign_requests_status
ON assign_requests(status);

CREATE INDEX idx_assign_request_details_request
ON assign_request_details(assign_request_id);

CREATE INDEX idx_assign_request_details_category
ON assign_request_details(category_id);

CREATE INDEX idx_assign_request_details_approved_by
ON assign_request_details(approved_by_employee_id);

CREATE INDEX idx_device_requests_created_by_employee
ON device_requests(created_by_employee_id);

CREATE INDEX idx_device_requests_type_status
ON device_requests(request_type, status);

CREATE INDEX idx_device_request_details_request
ON device_request_details(device_request_id);

CREATE INDEX idx_device_request_details_device
ON device_request_details(device_id);

CREATE INDEX idx_device_request_details_approved_by
ON device_request_details(approved_by_employee_id);

CREATE INDEX idx_device_state_histories_device
ON device_state_histories(device_id, created_at);

CREATE INDEX idx_device_disposals_created_by_employee
ON device_disposals(created_by_employee_id);


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

CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_devices_updated_at
BEFORE UPDATE ON devices
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_employee_devices_updated_at
BEFORE UPDATE ON employee_devices
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_assign_requests_updated_at
BEFORE UPDATE ON assign_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_device_requests_updated_at
BEFORE UPDATE ON device_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_device_disposals_updated_at
BEFORE UPDATE ON device_disposals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();