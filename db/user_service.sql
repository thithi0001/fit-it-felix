-- =========================================================
-- Extensions
-- =========================================================

CREATE EXTENSION IF NOT EXISTS citext;

-- =========================================================
-- Enums
-- =========================================================

CREATE TYPE user_status AS ENUM (
    'active',
    'locked'
);

CREATE TYPE approval_action AS ENUM (
    'approved',
    'rejected',
    'cancelled'
);

-- =========================================================
-- Roles
-- =========================================================

CREATE TABLE roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- Users
-- =========================================================

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    role_id BIGINT NOT NULL,

    username CITEXT NOT NULL UNIQUE,
    email CITEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    status user_status NOT NULL DEFAULT 'active',

    last_login_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
);

-- =========================================================
-- Departments
-- =========================================================

CREATE TABLE departments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- Employees
-- =========================================================

CREATE TABLE employees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE,

    department_id BIGINT,

    manager_employee_id BIGINT,

    employee_code VARCHAR(30) UNIQUE NOT NULL,

    full_name VARCHAR(150) NOT NULL,

    position VARCHAR(100),

    phone VARCHAR(20),

    date_of_birth DATE,

    hire_date DATE,

    termination_date DATE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_employee_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_employee_manager
        FOREIGN KEY (manager_employee_id)
        REFERENCES employees(id)
        ON DELETE SET NULL
);

-- =========================================================
-- Approvals
-- =========================================================

CREATE TABLE approvals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    table_name VARCHAR(100) NOT NULL,

    record_id BIGINT NOT NULL,

    approved_by_user_id BIGINT NOT NULL,

    action approval_action NOT NULL,

    note TEXT,

    acted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_approval_user
        FOREIGN KEY (approved_by_user_id)
        REFERENCES users(id)
);

-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_users_role
ON users(role_id);

CREATE INDEX idx_employees_department
ON employees(department_id);

CREATE INDEX idx_employees_manager
ON employees(manager_employee_id);

CREATE INDEX idx_approvals_record
ON approvals(table_name, record_id);

CREATE INDEX idx_approvals_user
ON approvals(approved_by_user_id);