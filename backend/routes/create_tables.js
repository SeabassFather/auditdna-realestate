// ══════════════════════════════════════════════════════════════════════════════
//  AUDITDNA — CREATE ALL DATABASE TABLES
//  Path: C:\AuditDNA\auditdna-realestate\backend\create_tables.js
//  Run:  node create_tables.js
// ══════════════════════════════════════════════════════════════════════════════

require('dotenv').config();

const { Pool } = require('pg');

// Direct connection — bypasses server.js so this runs standalone
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ── TABLE DEFINITIONS ─────────────────────────────────────────────────────────
const sql =

  "CREATE TABLE IF NOT EXISTS consumers (" +
    "id               SERIAL        PRIMARY KEY, "      +
    "consumer_ref     VARCHAR(50)   UNIQUE, "           +
    "full_name        VARCHAR(255)  NOT NULL, "         +
    "email            VARCHAR(255)  UNIQUE NOT NULL, "  +
    "phone            VARCHAR(50), "                    +
    "phone_verified   BOOLEAN       DEFAULT FALSE, "    +
    "property_address VARCHAR(500), "                   +
    "city             VARCHAR(100), "                   +
    "state            VARCHAR(10), "                    +
    "zip              VARCHAR(10), "                    +
    "referral_source  VARCHAR(100), "                   +
    "partner_code     VARCHAR(100), "                   +
    "photo_id_file    VARCHAR(500), "                   +
    "selfie_file      VARCHAR(500), "                   +
    "pin              VARCHAR(20), "                    +
    "role             VARCHAR(20)   DEFAULT 'consumer', " +
    "created_at       TIMESTAMP     DEFAULT NOW(), "    +
    "updated_at       TIMESTAMP     DEFAULT NOW()"      +
  "); " +

  "CREATE TABLE IF NOT EXISTS audit_results (" +
    "id                SERIAL        PRIMARY KEY, "     +
    "case_id           VARCHAR(100)  UNIQUE, "          +
    "consumer_id       INTEGER, "                       +
    "consumer_email    VARCHAR(255), "                  +
    "selected_path     VARCHAR(20), "                   +
    "total_violations  INTEGER       DEFAULT 0, "       +
    "total_recovery    NUMERIC(12,2) DEFAULT 0, "       +
    "our_fee           NUMERIC(12,2) DEFAULT 0, "       +
    "our_fee_pct       NUMERIC(5,2)  DEFAULT 35, "      +
    "consumer_receives NUMERIC(12,2) DEFAULT 0, "       +
    "status            VARCHAR(30)   DEFAULT 'pending', " +
    "audit_data        JSONB, "                         +
    "files_uploaded    INTEGER       DEFAULT 0, "       +
    "authorized_at     TIMESTAMP, "                     +
    "created_at        TIMESTAMP     DEFAULT NOW(), "   +
    "updated_at        TIMESTAMP     DEFAULT NOW()"     +
  "); " +

  "CREATE TABLE IF NOT EXISTS consumer_authorizations (" +
    "id             SERIAL        PRIMARY KEY, "        +
    "audit_id       INTEGER, "                          +
    "case_id        VARCHAR(100), "                     +
    "signature_data TEXT, "                             +
    "path_chosen    VARCHAR(20), "                      +
    "legal_checks   JSONB, "                            +
    "signed_at      TIMESTAMP     DEFAULT NOW(), "      +
    "ip_address     VARCHAR(50), "                      +
    "user_agent     TEXT"                               +
  "); " +

  "CREATE TABLE IF NOT EXISTS cooling_off_periods (" +
    "id                SERIAL        PRIMARY KEY, "     +
    "case_id           VARCHAR(100)  UNIQUE, "          +
    "audit_id          INTEGER, "                       +
    "consumer_email    VARCHAR(255), "                  +
    "selected_path     VARCHAR(20), "                   +
    "total_recovery    NUMERIC(12,2), "                 +
    "our_fee           NUMERIC(12,2), "                 +
    "consumer_receives NUMERIC(12,2), "                 +
    "cooling_off_start TIMESTAMP     DEFAULT NOW(), "   +
    "cooling_off_end   TIMESTAMP, "                     +
    "cancelled         BOOLEAN       DEFAULT FALSE, "   +
    "cancelled_at      TIMESTAMP, "                     +
    "created_at        TIMESTAMP     DEFAULT NOW()"     +
  "); " +

  "CREATE TABLE IF NOT EXISTS audit_violations (" +
    "id              SERIAL        PRIMARY KEY, "       +
    "audit_id        INTEGER, "                         +
    "case_id         VARCHAR(100), "                    +
    "tier            INTEGER, "                         +
    "violation_type  VARCHAR(100), "                    +
    "law_reference   VARCHAR(255), "                    +
    "description     TEXT, "                            +
    "recovery_amount NUMERIC(10,2) DEFAULT 0, "         +
    "confidence      NUMERIC(5,2)  DEFAULT 0, "         +
    "created_at      TIMESTAMP     DEFAULT NOW()"       +
  ");";

// ── EXECUTE ───────────────────────────────────────────────────────────────────
pool.query(sql)
  .then(() => {
    console.log('✅  ALL TABLES CREATED SUCCESSFULLY');
    pool.end();
  })
  .catch(err => {
    console.error('❌  ERROR:', err.message);
    pool.end();
    process.exit(1);
  });