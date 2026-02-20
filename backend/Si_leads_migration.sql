-- Run this once in PostgreSQL to add SI columns to leads table
-- (Brain.js will write scores here after each lead_captured workflow)

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS si_tier        INTEGER,
  ADD COLUMN IF NOT EXISTS si_confidence  NUMERIC(4,3),
  ADD COLUMN IF NOT EXISTS si_priority    VARCHAR(10),
  ADD COLUMN IF NOT EXISTS si_flags       JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS si_summary     TEXT,
  ADD COLUMN IF NOT EXISTS si_scored_at   TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_leads_si_tier     ON leads(si_tier);
CREATE INDEX IF NOT EXISTS idx_leads_si_priority ON leads(si_priority);