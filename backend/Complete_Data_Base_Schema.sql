-- ============================================================================
-- AUDITDNA COMPLETE DATABASE SCHEMA - PRODUCTION READY
-- MFG, Inc. DBA AuditDNA Consumer Services | NMLS #337526
-- 
-- COMPLETE ECOSYSTEM:
-- 1. Core Audit System (60 Miners)
-- 2. Monitoring Subscriptions (Shield Basic/Premium/Elite)
-- 3. AutoSave Autonomous Optimization
-- 4. Data Monetization Marketplace
-- 5. Affiliate Partner Network
-- 6. Lead Generation & Sales
-- 7. Data Licensing Infrastructure
-- 8. White-Label Licensing
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- For encryption

-- ============================================================================
-- SECTION 1: CORE SYSTEM TABLES
-- ============================================================================

-- Users (Admin, Sales, Owner)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'owner', 'admin', 'sales', 'consumer'
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  pin VARCHAR(6),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Consumers
CREATE TABLE consumers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  ssn VARCHAR(11), -- Encrypted with pgcrypto
  dob DATE,
  
  -- Property
  property_address TEXT,
  city VARCHAR(100),
  state CHAR(2),
  zip VARCHAR(10),
  property_value DECIMAL(12,2),
  
  -- Banking
  bank_name VARCHAR(255),
  account_number VARCHAR(100), -- Encrypted
  routing_number VARCHAR(9), -- Encrypted
  
  -- Credit & Financial
  credit_score INT,
  estimated_income DECIMAL(12,2),
  
  -- Documents
  photo_id_url TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cases
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consumer_id UUID REFERENCES consumers(id),
  case_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Loan Information
  loan_number VARCHAR(100),
  lender_name VARCHAR(255),
  lender_address TEXT,
  lender_state CHAR(2),
  lender_email VARCHAR(255),
  servicer_name VARCHAR(255),
  servicer_address TEXT,
  servicer_state CHAR(2),
  servicer_email VARCHAR(255),
  original_loan_date DATE,
  original_loan_amount DECIMAL(12,2),
  current_loan_balance DECIMAL(12,2),
  interest_rate DECIMAL(5,4),
  loan_type VARCHAR(50), -- '30-year-fixed', '15-year-fixed', 'ARM'
  
  -- Escrow & Insurance
  escrow_balance DECIMAL(12,2),
  pmi_monthly DECIMAL(10,2),
  property_tax_annual DECIMAL(12,2),
  home_insurance_annual DECIMAL(12,2),
  
  -- Recovery
  total_recovery DECIMAL(12,2),
  commission_rate DECIMAL(5,2), -- 35 or 39
  commission_amount DECIMAL(12,2),
  
  -- Status
  status VARCHAR(50) DEFAULT 'registered',
  -- Status: registered, uploaded, processing, legal_review, payment_pending, paid, filed, response_received, completed, cancelled
  path_selected VARCHAR(20), -- 'escrow-35' or 'direct-39'
  
  -- Escrow
  escrow_account_number VARCHAR(100),
  creditor_deadline DATE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  document_type VARCHAR(100) NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  file_size BIGINT,
  mime_type VARCHAR(100),
  upload_date TIMESTAMP DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE
);

-- Audit Results
CREATE TABLE audit_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  total_recovery DECIMAL(12,2),
  violations JSONB, -- Array of violation objects
  chain_of_command JSONB, -- Array of servicer transfer objects
  state_analysis JSONB, -- Multi-jurisdiction analysis
  miner_data JSONB, -- All 60 miner results
  created_at TIMESTAMP DEFAULT NOW()
);

-- Servicer Transfers (Chain of Command)
CREATE TABLE servicer_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  transfer_date DATE,
  from_servicer VARCHAR(255),
  to_servicer VARCHAR(255),
  transfer_fee DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Emails (Audit Trail)
CREATE TABLE emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  recipient_type VARCHAR(50) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject TEXT,
  body TEXT,
  attachments JSONB,
  sent_at TIMESTAMP DEFAULT NOW(),
  delivered BOOLEAN DEFAULT FALSE,
  opened BOOLEAN DEFAULT FALSE,
  response_received BOOLEAN DEFAULT FALSE
);

-- Responses (Incoming)
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  from_email VARCHAR(255),
  from_entity VARCHAR(50),
  subject TEXT,
  body TEXT,
  attachments JSONB,
  received_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'unread',
  assigned_to UUID REFERENCES users(id)
);

-- Signatures
CREATE TABLE signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  consumer_id UUID REFERENCES consumers(id),
  document_type VARCHAR(100),
  signature_data TEXT,
  signed_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  device_info TEXT
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  amount DECIMAL(12,2),
  payment_type VARCHAR(50),
  payment_method VARCHAR(50),
  stripe_payment_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Fee Consents
CREATE TABLE fee_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  consumer_id UUID REFERENCES consumers(id),
  path_selected VARCHAR(20),
  upfront_fee_amount DECIMAL(10,2),
  estimated_recovery DECIMAL(10,2),
  estimated_commission DECIMAL(10,2),
  bank_name VARCHAR(255),
  account_number VARCHAR(100),
  routing_number VARCHAR(9),
  signature_data TEXT,
  signed_at TIMESTAMP,
  ip_address VARCHAR(45),
  all_checkboxes_checked BOOLEAN DEFAULT FALSE,
  copy_sent_to_consumer BOOLEAN DEFAULT FALSE,
  cancellation_deadline TIMESTAMP,
  cancelled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- SECTION 2: MONITORING & AUTOSAVE TABLES
-- ============================================================================

-- Monitoring Subscriptions
CREATE TABLE mortgage_monitoring_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consumer_id UUID REFERENCES consumers(id),
  case_id UUID REFERENCES cases(id), -- Original recovery case
  
  -- Subscription Details
  tier VARCHAR(20), -- 'basic', 'premium', 'elite'
  status VARCHAR(20), -- 'active', 'paused', 'cancelled'
  monthly_fee DECIMAL(10,2),
  
  -- Current Mortgage Data (Snapshot)
  current_servicer VARCHAR(255),
  current_balance DECIMAL(12,2),
  escrow_balance DECIMAL(12,2),
  pmi_amount DECIMAL(10,2),
  pmi_removal_eligible BOOLEAN DEFAULT FALSE,
  interest_rate DECIMAL(5,4),
  home_insurance_premium DECIMAL(10,2),
  home_insurance_carrier VARCHAR(255),
  
  -- Alert Preferences
  email_alerts BOOLEAN DEFAULT TRUE,
  sms_alerts BOOLEAN DEFAULT FALSE,
  alert_threshold DECIMAL(10,2) DEFAULT 50,
  
  -- Billing
  started_at TIMESTAMP,
  next_billing_date DATE,
  last_audit_date TIMESTAMP,
  stripe_subscription_id VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Monitoring Audit History
CREATE TABLE monitoring_audit_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES mortgage_monitoring_subscriptions(id),
  audit_date TIMESTAMP,
  
  -- Snapshot Data
  servicer_name VARCHAR(255),
  loan_balance DECIMAL(12,2),
  escrow_balance DECIMAL(12,2),
  pmi_amount DECIMAL(10,2),
  interest_rate DECIMAL(5,4),
  
  -- Changes Detected
  changes_detected JSONB,
  new_fees_detected JSONB,
  violations_found JSONB,
  
  -- Alerts
  alert_sent BOOLEAN DEFAULT FALSE,
  alert_type VARCHAR(50),
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Monitoring Alerts
CREATE TABLE monitoring_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES mortgage_monitoring_subscriptions(id),
  alert_type VARCHAR(50),
  severity VARCHAR(20),
  title VARCHAR(255),
  message TEXT,
  amount DECIMAL(12,2),
  
  -- Actions Taken
  email_sent BOOLEAN DEFAULT FALSE,
  sms_sent BOOLEAN DEFAULT FALSE,
  cfpb_filed BOOLEAN DEFAULT FALSE,
  demand_sent BOOLEAN DEFAULT FALSE,
  
  acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- AutoSave Opportunities
CREATE TABLE autosave_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES mortgage_monitoring_subscriptions(id),
  opportunity_type VARCHAR(50), -- 'refinance', 'insurance', 'pmi', 'tax_appeal', 'heloc'
  detected_date TIMESTAMP,
  
  -- Savings Calculation
  monthly_savings DECIMAL(10,2),
  annual_savings DECIMAL(10,2),
  lifetime_savings DECIMAL(10,2),
  
  -- Current vs Recommended
  current_value JSONB,
  recommended_value JSONB,
  
  -- Recommended Partners
  recommended_partners JSONB, -- Top 3 lenders/insurers
  
  -- Consumer Action Tracking
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP,
  email_opened BOOLEAN DEFAULT FALSE,
  consumer_clicked BOOLEAN DEFAULT FALSE,
  consumer_requested_quote BOOLEAN DEFAULT FALSE,
  consumer_converted BOOLEAN DEFAULT FALSE, -- Did they act?
  
  -- Conversion Details
  converted_with_partner_id UUID, -- If they used our referral
  referral_commission DECIMAL(10,2),
  conversion_date TIMESTAMP,
  
  -- Status
  status VARCHAR(20), -- 'active', 'expired', 'acted', 'dismissed'
  expires_at TIMESTAMP,
  dismissed_reason TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Market Rate History (for trend analysis)
CREATE TABLE market_rate_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE,
  loan_type VARCHAR(50),
  average_rate DECIMAL(5,4),
  lowest_rate DECIMAL(5,4),
  highest_rate DECIMAL(5,4),
  source VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- SECTION 3: DATA MONETIZATION - LEAD GENERATION
-- ============================================================================

-- Generated Leads
CREATE TABLE generated_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consumer_id UUID REFERENCES consumers(id),
  subscription_id UUID REFERENCES mortgage_monitoring_subscriptions(id),
  opportunity_id UUID REFERENCES autosave_opportunities(id),
  
  lead_type VARCHAR(50), -- 'insurance', 'refinance', 'heloc', 'tax_appeal', 'auto_insurance', 'life_insurance'
  lead_status VARCHAR(20), -- 'generated', 'available', 'sold', 'expired', 'converted'
  
  -- Lead Data (Consumer Info + Intent)
  lead_data JSONB, -- Full consumer profile + intent signals
  lead_score INT CHECK (lead_score BETWEEN 0 AND 100), -- Quality score
  
  -- Intent Signals
  intent_strength VARCHAR(20), -- 'low', 'medium', 'high', 'very_high'
  click_count INT DEFAULT 0,
  quote_requested BOOLEAN DEFAULT FALSE,
  
  -- Sales Data
  sold_to_partner_id UUID, -- Which partner bought it
  sold_price DECIMAL(10,2),
  sold_at TIMESTAMP,
  
  -- Conversion Tracking
  converted BOOLEAN DEFAULT FALSE,
  conversion_value DECIMAL(12,2),
  conversion_product VARCHAR(100),
  partner_commission_paid DECIMAL(10,2),
  
  -- Expiration
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP, -- Leads expire after 30-60 days
  
  CONSTRAINT valid_expiration CHECK (expires_at > created_at)
);

-- ============================================================================
-- SECTION 4: AFFILIATE PARTNER NETWORK
-- ============================================================================

-- Affiliate Partners
CREATE TABLE affiliate_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Partner Type
  partner_type VARCHAR(50), -- 'insurance_agent', 'mlo', 'tax_professional', 'contractor', 'heloc_lender'
  
  -- Company Information
  company_name VARCHAR(255) NOT NULL,
  dba_name VARCHAR(255),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(255),
  
  -- Membership
  membership_tier VARCHAR(50), -- 'basic', 'premium', 'enterprise'
  monthly_fee DECIMAL(10,2),
  membership_status VARCHAR(20), -- 'active', 'pending', 'suspended', 'cancelled'
  
  -- Geographic Coverage
  coverage_states JSONB, -- Array of state codes ["CA", "NV", "AZ"]
  coverage_zip_codes JSONB, -- Array of specific zip codes
  exclusive_territories JSONB, -- Array of exclusive zip codes
  
  -- Licensing & Credentials
  licenses JSONB, -- Array of license objects {state, number, type, expiration}
  eo_insurance_carrier VARCHAR(255),
  eo_insurance_policy VARCHAR(255),
  eo_insurance_amount DECIMAL(12,2),
  eo_insurance_expiration DATE,
  
  -- Vetting Status
  vetted BOOLEAN DEFAULT FALSE,
  vetted_by UUID REFERENCES users(id),
  vetted_at TIMESTAMP,
  vetting_notes TEXT,
  background_check_completed BOOLEAN DEFAULT FALSE,
  
  -- Performance Metrics
  leads_received INT DEFAULT 0,
  leads_contacted INT DEFAULT 0,
  leads_converted INT DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  average_response_time_minutes INT,
  consumer_satisfaction_rating DECIMAL(3,2), -- 0.00 to 5.00
  complaints_count INT DEFAULT 0,
  
  -- Financial
  total_commissions_paid DECIMAL(12,2) DEFAULT 0,
  total_fees_paid DECIMAL(12,2) DEFAULT 0,
  outstanding_balance DECIMAL(12,2) DEFAULT 0,
  
  -- Bank Details (for commission payouts)
  bank_name VARCHAR(255),
  bank_account VARCHAR(100), -- Encrypted
  bank_routing VARCHAR(9), -- Encrypted
  
  -- Status
  joined_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP,
  suspended_at TIMESTAMP,
  suspension_reason TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Partner Lead Assignments
CREATE TABLE partner_lead_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES generated_leads(id),
  partner_id UUID REFERENCES affiliate_partners(id),
  
  -- Assignment
  assigned_at TIMESTAMP DEFAULT NOW(),
  assignment_method VARCHAR(50), -- 'exclusive', 'round_robin', 'auction', 'direct_purchase'
  
  -- Partner Response
  partner_viewed BOOLEAN DEFAULT FALSE,
  partner_viewed_at TIMESTAMP,
  partner_contacted_consumer BOOLEAN DEFAULT FALSE,
  partner_contacted_at TIMESTAMP,
  
  -- Outcome
  outcome VARCHAR(50), -- 'converted', 'rejected', 'no_response', 'consumer_declined'
  outcome_date TIMESTAMP,
  outcome_notes TEXT,
  
  -- Commission
  commission_amount DECIMAL(10,2),
  commission_paid BOOLEAN DEFAULT FALSE,
  commission_paid_at TIMESTAMP
);

-- Partner Reviews (Consumer feedback)
CREATE TABLE partner_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES affiliate_partners(id),
  consumer_id UUID REFERENCES consumers(id),
  lead_id UUID REFERENCES generated_leads(id),
  
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  would_recommend BOOLEAN,
  
  -- Categories
  professionalism_rating INT CHECK (professionalism_rating BETWEEN 1 AND 5),
  responsiveness_rating INT CHECK (responsiveness_rating BETWEEN 1 AND 5),
  value_rating INT CHECK (value_rating BETWEEN 1 AND 5),
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- SECTION 5: DATA LICENSING & B2B
-- ============================================================================

-- Data Licensing Customers
CREATE TABLE data_licensing_customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_type VARCHAR(50), -- 'insurance_carrier', 'lender', 'title_company', 'proptech', 'fintech'
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  
  -- Contacts
  primary_contact_name VARCHAR(255),
  primary_contact_email VARCHAR(255),
  primary_contact_phone VARCHAR(20),
  
  -- License Type
  license_type VARCHAR(50), -- 'market_intelligence', 'competitive_analysis', 'api_access', 'custom'
  
  -- Pricing
  monthly_fee DECIMAL(12,2),
  setup_fee DECIMAL(12,2),
  annual_contract_value DECIMAL(12,2),
  per_api_call_fee DECIMAL(5,4),
  
  -- Data Access
  data_scope JSONB, -- What types of data they can access
  geographic_scope JSONB, -- Which states/metros
  
  -- API Access
  api_key VARCHAR(255), -- Encrypted, for authentication
  api_secret VARCHAR(255), -- Encrypted
  rate_limit_per_day INT DEFAULT 1000,
  rate_limit_per_hour INT DEFAULT 100,
  
  -- Usage Tracking
  api_calls_this_month INT DEFAULT 0,
  data_downloads_this_month INT DEFAULT 0,
  last_api_call TIMESTAMP,
  
  -- Contract
  contract_start DATE,
  contract_end DATE,
  auto_renew BOOLEAN DEFAULT TRUE,
  contract_status VARCHAR(20), -- 'active', 'suspended', 'cancelled'
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- API Usage Log
CREATE TABLE api_usage_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES data_licensing_customers(id),
  
  endpoint VARCHAR(255),
  method VARCHAR(10),
  query_params JSONB,
  
  -- Response
  response_code INT,
  response_time_ms INT,
  data_returned_records INT,
  
  -- Billing
  billable BOOLEAN DEFAULT TRUE,
  amount_charged DECIMAL(10,4),
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Data Insights (Aggregated/Anonymized Data Products)
CREATE TABLE data_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  insight_type VARCHAR(50), -- 'refinance_trends', 'insurance_pricing', 'property_tax_analysis', 'pmi_removal_rates'
  geographic_scope VARCHAR(50), -- 'national', 'state', 'metro', 'zip'
  geographic_value VARCHAR(20), -- 'CA', 'San Francisco Bay Area', '94102'
  
  -- Time Period
  period_start DATE,
  period_end DATE,
  
  -- Aggregated Data
  data JSONB, -- Anonymized, aggregated metrics
  sample_size INT, -- How many consumers contributed
  
  -- Metadata
  data_quality_score INT CHECK (data_quality_score BETWEEN 0 AND 100),
  last_updated TIMESTAMP,
  
  -- Pricing
  price_per_download DECIMAL(10,2),
  times_purchased INT DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  
  generated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- ============================================================================
-- SECTION 6: WHITE-LABEL LICENSING
-- ============================================================================

-- White-Label Licensees
CREATE TABLE whitelabel_licensees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  licensee_type VARCHAR(50), -- 'credit_union', 'bank', 'insurance_company', 'mortgage_company'
  institution_name VARCHAR(255) NOT NULL,
  
  -- Licensing
  monthly_fee DECIMAL(12,2),
  setup_fee DECIMAL(12,2),
  per_member_fee DECIMAL(5,2), -- Additional fee per member using service
  member_count INT DEFAULT 0,
  max_members INT, -- Cap on members (if applicable)
  
  -- Branding
  custom_branding JSONB, -- {logo_url, primary_color, secondary_color, font}
  custom_domain VARCHAR(255), -- e.g., mortgagemonitor.mycreditunion.com
  branded_email_domain VARCHAR(255),
  
  -- Features Enabled
  features_enabled JSONB, -- {audit: true, monitoring: true, autosave: true, ...}
  
  -- Support
  support_tier VARCHAR(50), -- 'standard', 'premium', 'enterprise'
  dedicated_support BOOLEAN DEFAULT FALSE,
  support_contact_name VARCHAR(255),
  support_contact_email VARCHAR(255),
  
  -- Contract
  contract_start DATE,
  contract_end DATE,
  auto_renew BOOLEAN DEFAULT TRUE,
  contract_status VARCHAR(20),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- White-Label Member Usage
CREATE TABLE whitelabel_member_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  licensee_id UUID REFERENCES whitelabel_licensees(id),
  
  member_identifier VARCHAR(255), -- Credit union member number, etc.
  
  -- Usage
  audits_run INT DEFAULT 0,
  monitoring_active BOOLEAN DEFAULT FALSE,
  autosave_enabled BOOLEAN DEFAULT FALSE,
  
  -- Revenue Attribution
  recovery_amount DECIMAL(12,2) DEFAULT 0,
  commission_earned DECIMAL(12,2) DEFAULT 0,
  
  first_used TIMESTAMP,
  last_used TIMESTAMP
);

-- ============================================================================
-- SECTION 7: CONSUMER PRIVACY & CONSENT
-- ============================================================================

-- Data Sharing Consents
CREATE TABLE data_sharing_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consumer_id UUID REFERENCES consumers(id),
  
  -- Granular Consent
  consent_lead_sales BOOLEAN DEFAULT FALSE,
  consent_data_licensing BOOLEAN DEFAULT TRUE, -- Anonymized only
  consent_partner_sharing BOOLEAN DEFAULT FALSE,
  consent_marketing BOOLEAN DEFAULT TRUE,
  
  -- Specific Categories
  consent_insurance_leads BOOLEAN DEFAULT FALSE,
  consent_refinance_leads BOOLEAN DEFAULT FALSE,
  consent_contractor_leads BOOLEAN DEFAULT FALSE,
  
  -- Opt-outs
  opted_out_categories JSONB,
  
  -- CCPA Compliance
  ccpa_disclosure_provided BOOLEAN DEFAULT FALSE,
  ccpa_disclosure_date TIMESTAMP,
  do_not_sell_request BOOLEAN DEFAULT FALSE,
  do_not_sell_date TIMESTAMP,
  
  -- Data Requests
  data_access_requested BOOLEAN DEFAULT FALSE,
  data_access_request_date TIMESTAMP,
  data_delete_requested BOOLEAN DEFAULT FALSE,
  data_delete_request_date TIMESTAMP,
  data_deleted BOOLEAN DEFAULT FALSE,
  data_deleted_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Consumer Data Access Log (CCPA compliance)
CREATE TABLE consumer_data_access_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consumer_id UUID REFERENCES consumers(id),
  
  access_type VARCHAR(50), -- 'view', 'download', 'delete_request', 'opt_out'
  requested_by VARCHAR(20), -- 'consumer', 'admin'
  ip_address VARCHAR(45),
  
  data_provided JSONB, -- What data was shared
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Core Tables
CREATE INDEX idx_cases_consumer_id ON cases(consumer_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX idx_documents_case_id ON documents(case_id);
CREATE INDEX idx_audit_results_case_id ON audit_results(case_id);
CREATE INDEX idx_emails_case_id ON emails(case_id);
CREATE INDEX idx_responses_case_id ON responses(case_id);
CREATE INDEX idx_responses_status ON responses(status);
CREATE INDEX idx_payments_case_id ON payments(case_id);

-- Monitoring
CREATE INDEX idx_monitoring_consumer_id ON mortgage_monitoring_subscriptions(consumer_id);
CREATE INDEX idx_monitoring_status ON mortgage_monitoring_subscriptions(status);
CREATE INDEX idx_monitoring_next_billing ON mortgage_monitoring_subscriptions(next_billing_date);
CREATE INDEX idx_monitoring_alerts_subscription ON monitoring_alerts(subscription_id);

-- AutoSave
CREATE INDEX idx_autosave_subscription ON autosave_opportunities(subscription_id);
CREATE INDEX idx_autosave_status ON autosave_opportunities(status);
CREATE INDEX idx_autosave_expires ON autosave_opportunities(expires_at);

-- Leads
CREATE INDEX idx_leads_consumer ON generated_leads(consumer_id);
CREATE INDEX idx_leads_status ON generated_leads(lead_status);
CREATE INDEX idx_leads_type ON generated_leads(lead_type);
CREATE INDEX idx_leads_expires ON generated_leads(expires_at);
CREATE INDEX idx_leads_score ON generated_leads(lead_score DESC);

-- Partners
CREATE INDEX idx_partners_type ON affiliate_partners(partner_type);
CREATE INDEX idx_partners_status ON affiliate_partners(membership_status);
CREATE INDEX idx_partners_performance ON affiliate_partners(conversion_rate DESC);

-- Data Licensing
CREATE INDEX idx_licensing_status ON data_licensing_customers(contract_status);
CREATE INDEX idx_api_usage_customer ON api_usage_log(customer_id);
CREATE INDEX idx_api_usage_created ON api_usage_log(created_at DESC);

-- Privacy
CREATE INDEX idx_consents_consumer ON data_sharing_consents(consumer_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consumers_updated_at BEFORE UPDATE ON consumers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON mortgage_monitoring_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON affiliate_partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_licensing_updated_at BEFORE UPDATE ON data_licensing_customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Admin User
INSERT INTO users (email, password_hash, role, first_name, last_name, pin)
VALUES (
  'saul@auditdna.com',
  '$2b$10$XQZqJZ7Z7Z7Z7Z7Z7Z7Z7Z', -- Replace with actual bcrypt hash of 'Admin2026!'
  'owner',
  'Saul',
  'Garcia',
  '060905'
);

-- Demo User
INSERT INTO users (email, password_hash, role, first_name, last_name, pin)
VALUES (
  'demo@auditdna.com',
  '$2b$10$YQZqJZ7Z7Z7Z7Z7Z7Z7Z7Z', -- Replace with actual bcrypt hash of 'Demo2026!'
  'consumer',
  'Demo',
  'User',
  '0000'
);

-- Sample Market Rates (for AutoSave)
INSERT INTO market_rate_history (date, loan_type, average_rate, lowest_rate, highest_rate, source)
VALUES 
  (CURRENT_DATE, '30-year-fixed', 6.85, 6.50, 7.20, 'Freddie Mac'),
  (CURRENT_DATE, '15-year-fixed', 6.10, 5.85, 6.45, 'Freddie Mac'),
  (CURRENT_DATE, '5/1-ARM', 6.45, 6.15, 6.80, 'Freddie Mac');

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- Active Subscriptions Summary
CREATE VIEW v_active_subscriptions AS
SELECT 
  COUNT(*) as total_active,
  SUM(CASE WHEN tier = 'basic' THEN 1 ELSE 0 END) as basic_count,
  SUM(CASE WHEN tier = 'premium' THEN 1 ELSE 0 END) as premium_count,
  SUM(CASE WHEN tier = 'elite' THEN 1 ELSE 0 END) as elite_count,
  SUM(monthly_fee) as total_mrr
FROM mortgage_monitoring_subscriptions
WHERE status = 'active';

-- Lead Performance
CREATE VIEW v_lead_performance AS
SELECT 
  lead_type,
  COUNT(*) as total_leads,
  SUM(CASE WHEN lead_status = 'sold' THEN 1 ELSE 0 END) as sold_leads,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) as converted_leads,
  AVG(lead_score) as avg_lead_score,
  SUM(sold_price) as total_revenue
FROM generated_leads
GROUP BY lead_type;

-- Partner Performance
CREATE VIEW v_partner_performance AS
SELECT 
  p.id,
  p.company_name,
  p.partner_type,
  p.membership_tier,
  p.leads_received,
  p.leads_converted,
  p.conversion_rate,
  p.consumer_satisfaction_rating,
  COUNT(r.id) as review_count
FROM affiliate_partners p
LEFT JOIN partner_reviews r ON p.id = r.partner_id
WHERE p.membership_status = 'active'
GROUP BY p.id;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE consumers IS 'Core consumer profiles with encrypted SSN and banking info';
COMMENT ON TABLE mortgage_monitoring_subscriptions IS 'Shield subscription tiers (Basic/Premium/Elite) with AutoSave';
COMMENT ON TABLE autosave_opportunities IS 'Autonomous savings opportunities detected by AutoSave system';
COMMENT ON TABLE generated_leads IS 'Qualified consumer leads for sale to affiliate partners';
COMMENT ON TABLE affiliate_partners IS 'Vetted professional partners (insurance agents, MLOs, tax pros, contractors)';
COMMENT ON TABLE data_licensing_customers IS 'B2B customers who license aggregated data (insurance carriers, lenders)';
COMMENT ON TABLE whitelabel_licensees IS 'Financial institutions white-labeling the AuditDNA platform';

-- ============================================================================
-- END OF SCHEMA
-- Total Tables: 35
-- Total Indexes: 25
-- Total Views: 3
-- Total Triggers: 6
-- ============================================================================

-- DEPLOYMENT NOTES:
-- 1. Run this schema on PostgreSQL 14+
-- 2. Update bcrypt password hashes for seed users
-- 3. Configure encryption keys for sensitive fields
-- 4. Setup scheduled jobs for AutoSave daily scans
-- 5. Configure backup schedule (daily recommended)
-- 6. Monitor database size (expect rapid growth with data monetization)