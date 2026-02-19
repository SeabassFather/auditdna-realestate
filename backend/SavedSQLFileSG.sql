-- ========================================
-- MORTGAGE AUDIT TABLES
-- Add to existing "auditdna" database
-- ========================================

-- Audit results table
CREATE TABLE IF NOT EXISTS audit_results (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(100) NOT NULL,
    total_violations INTEGER,
    total_recovery DECIMAL(10,2),
    our_fee DECIMAL(10,2),
    consumer_receives DECIMAL(10,2),
    audit_data JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    authorized_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consumer authorizations
CREATE TABLE IF NOT EXISTS consumer_authorizations (
    id SERIAL PRIMARY KEY,
    audit_id INTEGER REFERENCES audit_results(id),
    signature_data TEXT,
    path_chosen VARCHAR(20),
    signed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_case ON audit_results(case_id);
CREATE INDEX IF NOT EXISTS idx_audit_status ON audit_results(status);
CREATE INDEX IF NOT EXISTS idx_auth_audit ON consumer_authorizations(audit_id);

-- Grant permissions (adjust user as needed)
GRANT ALL PRIVILEGES ON audit_results TO postgres;
GRANT ALL PRIVILEGES ON consumer_authorizations TO postgres;
GRANT USAGE, SELECT ON SEQUENCE audit_results_id_seq TO postgres;
GRANT USAGE, SELECT ON SEQUENCE consumer_authorizations_id_seq TO postgres;