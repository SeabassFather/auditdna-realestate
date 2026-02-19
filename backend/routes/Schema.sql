-- ══════════════════════════════════════════════════════════════════════════════
--  AUDITDNA — COMPLETE DATABASE SCHEMA
--  Run this in pgAdmin on your existing "auditdna" database
--  Safe to run multiple times — uses IF NOT EXISTS on everything
-- ══════════════════════════════════════════════════════════════════════════════

-- ── 1. CONSUMERS ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS consumers (
  id                SERIAL        PRIMARY KEY,
  consumer_ref      VARCHAR(50)   UNIQUE,
  full_name         VARCHAR(255)  NOT NULL,
  email             VARCHAR(255)  UNIQUE NOT NULL,
  phone             VARCHAR(50),
  phone_verified    BOOLEAN       DEFAULT FALSE,
  property_address  VARCHAR(500),
  city              VARCHAR(100),
  state             VARCHAR(10),
  zip               VARCHAR(10),
  referral_source   VARCHAR(100),
  partner_code      VARCHAR(100),
  photo_id_file     VARCHAR(500),
  selfie_file       VARCHAR(500),
  pin               VARCHAR(20),
  role              VARCHAR(20)   DEFAULT 'consumer',
  created_at        TIMESTAMP     DEFAULT NOW(),
  updated_at        TIMESTAMP     DEFAULT NOW()
);

-- Add missing columns if table already existed without them
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumers' AND column_name='consumer_ref')   THEN ALTER TABLE consumers ADD COLUMN consumer_ref    VARCHAR(50);  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumers' AND column_name='photo_id_file') THEN ALTER TABLE consumers ADD COLUMN photo_id_file  VARCHAR(500); END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumers' AND column_name='selfie_file')   THEN ALTER TABLE consumers ADD COLUMN selfie_file    VARCHAR(500); END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumers' AND column_name='phone_verified')THEN ALTER TABLE consumers ADD COLUMN phone_verified  BOOLEAN DEFAULT FALSE; END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumers' AND column_name='role')         THEN ALTER TABLE consumers ADD COLUMN role           VARCHAR(20) DEFAULT 'consumer'; END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumers' AND column_name='updated_at')   THEN ALTER TABLE consumers ADD COLUMN updated_at     TIMESTAMP DEFAULT NOW(); END IF;
END $$;

-- ── 2. AUDIT RESULTS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_results (
  id                SERIAL        PRIMARY KEY,
  case_id           VARCHAR(100)  UNIQUE,
  consumer_id       INTEGER       REFERENCES consumers(id) ON DELETE SET NULL,
  consumer_email    VARCHAR(255),
  selected_path     VARCHAR(20),                        -- 'escrow' or 'direct'
  total_violations  INTEGER       DEFAULT 0,
  total_recovery    NUMERIC(12,2) DEFAULT 0,
  our_fee           NUMERIC(12,2) DEFAULT 0,
  our_fee_pct       NUMERIC(5,2)  DEFAULT 35,
  consumer_receives NUMERIC(12,2) DEFAULT 0,
  status            VARCHAR(30)   DEFAULT 'pending',    -- pending|authorized|cancelled|completed
  audit_data        JSONB,
  files_uploaded    INTEGER       DEFAULT 0,
  created_at        TIMESTAMP     DEFAULT NOW(),
  updated_at        TIMESTAMP     DEFAULT NOW()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audit_results' AND column_name='consumer_email') THEN ALTER TABLE audit_results ADD COLUMN consumer_email VARCHAR(255); END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audit_results' AND column_name='selected_path')  THEN ALTER TABLE audit_results ADD COLUMN selected_path  VARCHAR(20);  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audit_results' AND column_name='our_fee_pct')    THEN ALTER TABLE audit_results ADD COLUMN our_fee_pct    NUMERIC(5,2) DEFAULT 35; END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audit_results' AND column_name='files_uploaded') THEN ALTER TABLE audit_results ADD COLUMN files_uploaded INTEGER DEFAULT 0; END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='audit_results' AND column_name='updated_at')     THEN ALTER TABLE audit_results ADD COLUMN updated_at     TIMESTAMP DEFAULT NOW(); END IF;
END $$;

-- ── 3. CONSUMER AUTHORIZATIONS (Legal signatures) ─────────────────────────────
CREATE TABLE IF NOT EXISTS consumer_authorizations (
  id              SERIAL        PRIMARY KEY,
  audit_id        INTEGER       REFERENCES audit_results(id) ON DELETE CASCADE,
  case_id         VARCHAR(100),
  signature_data  TEXT,
  path_chosen     VARCHAR(20),
  legal_checks    JSONB,
  signed_at       TIMESTAMP     DEFAULT NOW(),
  ip_address      VARCHAR(50),
  user_agent      TEXT
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumer_authorizations' AND column_name='case_id')      THEN ALTER TABLE consumer_authorizations ADD COLUMN case_id      VARCHAR(100); END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumer_authorizations' AND column_name='legal_checks') THEN ALTER TABLE consumer_authorizations ADD COLUMN legal_checks JSONB;        END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumer_authorizations' AND column_name='ip_address')   THEN ALTER TABLE consumer_authorizations ADD COLUMN ip_address   VARCHAR(50);  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='consumer_authorizations' AND column_name='user_agent')   THEN ALTER TABLE consumer_authorizations ADD COLUMN user_agent   TEXT;         END IF;
END $$;

-- ── 4. COOLING OFF PERIODS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cooling_off_periods (
  id                SERIAL        PRIMARY KEY,
  case_id           VARCHAR(100)  UNIQUE,
  audit_id          INTEGER       REFERENCES audit_results(id) ON DELETE CASCADE,
  consumer_email    VARCHAR(255),
  selected_path     VARCHAR(20),
  total_recovery    NUMERIC(12,2),
  our_fee           NUMERIC(12,2),
  consumer_receives NUMERIC(12,2),
  cooling_off_start TIMESTAMP     DEFAULT NOW(),
  cooling_off_end   TIMESTAMP,
  cancelled         BOOLEAN       DEFAULT FALSE,
  cancelled_at      TIMESTAMP,
  cancel_reason     TEXT,
  created_at        TIMESTAMP     DEFAULT NOW()
);

-- ── 5. DOCUMENT UPLOADS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS document_uploads (
  id            SERIAL        PRIMARY KEY,
  case_id       VARCHAR(100),
  consumer_id   INTEGER       REFERENCES consumers(id) ON DELETE SET NULL,
  filename      VARCHAR(500),
  original_name VARCHAR(500),
  doc_type      VARCHAR(100),
  mime_type     VARCHAR(100),
  file_size     INTEGER,
  storage_path  VARCHAR(1000),
  s3_key        VARCHAR(1000),
  uploaded_at   TIMESTAMP     DEFAULT NOW()
);

-- ── 6. AUDIT VIOLATIONS (individual violation records) ────────────────────────
CREATE TABLE IF NOT EXISTS audit_violations (
  id              SERIAL        PRIMARY KEY,
  audit_id        INTEGER       REFERENCES audit_results(id) ON DELETE CASCADE,
  case_id         VARCHAR(100),
  tier            INTEGER,                             -- 1-6
  violation_type  VARCHAR(100),
  law_reference   VARCHAR(255),
  description     TEXT,
  recovery_amount NUMERIC(10,2) DEFAULT 0,
  confidence      NUMERIC(5,2)  DEFAULT 0,
  created_at      TIMESTAMP     DEFAULT NOW()
);

-- ── 7. EMAIL LOG ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_log (
  id          SERIAL        PRIMARY KEY,
  to_email    VARCHAR(255),
  subject     VARCHAR(500),
  type        VARCHAR(50),  -- registration|receipt|otp|audit_complete
  status      VARCHAR(20)   DEFAULT 'sent',
  error_msg   TEXT,
  sent_at     TIMESTAMP     DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
--  INDEXES — for fast lookups
-- ══════════════════════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_consumers_email        ON consumers             (email);
CREATE INDEX IF NOT EXISTS idx_consumers_ref          ON consumers             (consumer_ref);
CREATE INDEX IF NOT EXISTS idx_audit_results_case     ON audit_results         (case_id);
CREATE INDEX IF NOT EXISTS idx_audit_results_email    ON audit_results         (consumer_email);
CREATE INDEX IF NOT EXISTS idx_audit_results_status   ON audit_results         (status);
CREATE INDEX IF NOT EXISTS idx_violations_audit       ON audit_violations      (audit_id);
CREATE INDEX IF NOT EXISTS idx_cooling_case           ON cooling_off_periods   (case_id);
CREATE INDEX IF NOT EXISTS idx_docs_case              ON document_uploads      (case_id);

-- ══════════════════════════════════════════════════════════════════════════════
--  VERIFY — run this after to confirm all tables created
-- ══════════════════════════════════════════════════════════════════════════════
SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns
   WHERE table_name = t.table_name AND table_schema = 'public') AS column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN (
    'consumers','audit_results','consumer_authorizations',
    'cooling_off_periods','document_uploads','audit_violations','email_log'
  )
ORDER BY table_name;