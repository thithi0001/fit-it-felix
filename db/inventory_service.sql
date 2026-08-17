-- =========================================================
-- Inventory Service Database
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- Extensions
-- =========================================================

CREATE EXTENSION IF NOT EXISTS citext;


-- =========================================================
-- Enums
-- =========================================================

CREATE TYPE request_type AS ENUM (
    'issue',
    'return'
);

CREATE TYPE request_status AS ENUM (
    'pending',
    'success',
    'fail'
);


-- =========================================================
-- Suppliers
-- =========================================================

CREATE TABLE suppliers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Manufacturers
-- =========================================================

CREATE TABLE manufacturers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Items
-- =========================================================

CREATE TABLE items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    manufacturer_id BIGINT NOT NULL,

    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,

    unit VARCHAR(20) NOT NULL,

    minimum_stock INTEGER NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_items_manufacturer
        FOREIGN KEY (manufacturer_id)
        REFERENCES manufacturers(id),

    CONSTRAINT chk_items_minimum_stock
        CHECK (minimum_stock >= 0)
);


-- =========================================================
-- Receipts
-- =========================================================

CREATE TABLE receipts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    supplier_id BIGINT NOT NULL,

    created_by_employee_id BIGINT NOT NULL,

    receipt_number VARCHAR(20) NOT NULL UNIQUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_receipts_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
);


-- =========================================================
-- Receipt Details
-- =========================================================

CREATE TABLE receipt_details (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    receipt_id BIGINT NOT NULL,

    inventory_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 1,

    unit_price DECIMAL(12, 2),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_receipt_details_receipt
        FOREIGN KEY (receipt_id)
        REFERENCES receipts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_receipt_details_inventory
        FOREIGN KEY (inventory_id)
        REFERENCES inventory(id),

    CONSTRAINT chk_receipt_details_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_receipt_details_unit_price
        CHECK (unit_price IS NULL OR unit_price >= 0),

    CONSTRAINT uq_receipt_details_receipt_inventory
        UNIQUE (receipt_id, inventory_id)
);


-- =========================================================
-- Item Requests
-- =========================================================

CREATE TABLE item_requests (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_employee_id BIGINT NOT NULL,
    
    plan_id BIGINT,

    request_type request_type NOT NULL,

    status request_status NOT NULL DEFAULT 'pending',

    reason TEXT,

    approved_by_employee_id BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Item Request Details
-- =========================================================

CREATE TABLE item_request_details (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    item_request_id BIGINT NOT NULL,

    inventory_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT fk_item_request_details_request
        FOREIGN KEY (item_request_id)
        REFERENCES item_requests(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_item_request_details_inventory
        FOREIGN KEY (inventory_id)
        REFERENCES inventory(id),

    CONSTRAINT chk_item_request_details_quantity
        CHECK (quantity > 0),

    CONSTRAINT uq_item_request_details_request_inventory
        UNIQUE (item_request_id, inventory_id)
);


-- =========================================================
-- Inventory
-- =========================================================

CREATE TABLE inventory (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    item_id BIGINT NOT NULL,

    supplier_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_inventory_item
        FOREIGN KEY (item_id)
        REFERENCES items(id),

    CONSTRAINT fk_inventory_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id),

    CONSTRAINT chk_inventory_quantity
        CHECK (quantity >= 0),

    CONSTRAINT uq_inventory_item_supplier
        UNIQUE (item_id, supplier_id)
);


-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_items_manufacturer
ON items(manufacturer_id);

CREATE INDEX idx_receipts_supplier
ON receipts(supplier_id);

CREATE INDEX idx_receipts_created_by_employee
ON receipts(created_by_employee_id);

CREATE INDEX idx_receipt_details_inventory
ON receipt_details(inventory_id);

CREATE INDEX idx_item_requests_created_by_employee
ON item_requests(created_by_employee_id);

CREATE INDEX idx_item_requests_type_status
ON item_requests(request_type, status);

CREATE INDEX idx_item_requests_approved_by_employee
ON item_requests(approved_by_employee_id);

CREATE INDEX idx_item_request_details_inventory
ON item_request_details(inventory_id);

CREATE INDEX idx_inventory_item
ON inventory(item_id);

CREATE INDEX idx_inventory_supplier
ON inventory(supplier_id);


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

CREATE TRIGGER trg_suppliers_updated_at
BEFORE UPDATE ON suppliers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_manufacturers_updated_at
BEFORE UPDATE ON manufacturers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_items_updated_at
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_receipts_updated_at
BEFORE UPDATE ON receipts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_item_requests_updated_at
BEFORE UPDATE ON item_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_inventory_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();