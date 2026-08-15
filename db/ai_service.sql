-- =========================================================
-- AI Service Database
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- Enums
-- =========================================================

CREATE TYPE conversation_status AS ENUM (
    'active',
    'archived'
);


CREATE TYPE message_role AS ENUM (
    'system',
    'user',
    'assistant'
);


CREATE TYPE ai_request_status AS ENUM (
    'success',
    'failed'
);


-- =========================================================
-- Conversations
-- =========================================================

CREATE TABLE conversations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    employee_id BIGINT NOT NULL,

    title VARCHAR(255),

    status conversation_status NOT NULL DEFAULT 'active',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- Messages
-- =========================================================

CREATE TABLE messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    conversation_id BIGINT NOT NULL,

    role message_role NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_messages_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES conversations(id)
        ON DELETE CASCADE
);


-- =========================================================
-- AI Requests
-- =========================================================

CREATE TABLE ai_requests (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    conversation_id BIGINT NOT NULL,

    message_id BIGINT,

    model_name VARCHAR(100) NOT NULL,

    prompt_tokens INTEGER,

    completion_tokens INTEGER,

    total_tokens INTEGER,

    response_time_ms INTEGER,

    status ai_request_status NOT NULL,

    error_message TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_ai_requests_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES conversations(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ai_requests_message
        FOREIGN KEY (message_id)
        REFERENCES messages(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_ai_requests_prompt_tokens
        CHECK (
            prompt_tokens IS NULL
            OR prompt_tokens >= 0
        ),

    CONSTRAINT chk_ai_requests_completion_tokens
        CHECK (
            completion_tokens IS NULL
            OR completion_tokens >= 0
        ),

    CONSTRAINT chk_ai_requests_total_tokens
        CHECK (
            total_tokens IS NULL
            OR total_tokens >= 0
        ),

    CONSTRAINT chk_ai_requests_response_time
        CHECK (
            response_time_ms IS NULL
            OR response_time_ms >= 0
        )
);


-- =========================================================
-- Indexes
-- =========================================================

CREATE INDEX idx_conversations_employee
ON conversations(employee_id);


CREATE INDEX idx_conversations_employee_status
ON conversations(employee_id, status);


CREATE INDEX idx_messages_conversation
ON messages(conversation_id, created_at);


CREATE INDEX idx_ai_requests_conversation
ON ai_requests(conversation_id, created_at);


CREATE INDEX idx_ai_requests_message
ON ai_requests(message_id);


CREATE INDEX idx_ai_requests_status
ON ai_requests(status);


CREATE INDEX idx_ai_requests_model_name
ON ai_requests(model_name);


CREATE INDEX idx_ai_requests_created_at
ON ai_requests(created_at);


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


CREATE TRIGGER trg_conversations_updated_at
BEFORE UPDATE ON conversations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();