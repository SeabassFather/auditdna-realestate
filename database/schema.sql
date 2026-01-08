-- ============================================================================
-- AUDITDNA REAL ESTATE DATABASE SCHEMA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('agent', 'admin', 'buyer', 'seller')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  nmls_number VARCHAR(50),
  dre_license VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);

-- ============================================================================
-- PROPERTIES
-- ============================================================================

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('house', 'condo', 'land', 'commercial', 'development')),
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'pending', 'sold', 'off-market')),
  
  -- Location
  country VARCHAR(50) NOT NULL DEFAULT 'Mexico',
  state VARCHAR(100),
  city VARCHAR(100),
  region VARCHAR(100),
  address TEXT,
  zip_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Property Details
  bedrooms INT,
  bathrooms DECIMAL(3,1),
  sqft INT,
  lot_size INT,
  year_built INT,
  
  -- Pricing
  price DECIMAL(12, 2) NOT NULL,
  price_per_sqft DECIMAL(10, 2),
  hoa_fees DECIMAL(10, 2),
  property_tax DECIMAL(10, 2),
  
  -- Features
  amenities TEXT[], -- Array of amenities
  features TEXT[],
  
  -- Media
  images TEXT[], -- Array of image URLs
  video_url TEXT,
  virtual_tour_url TEXT,
  
  -- Listing Info
  listed_by UUID REFERENCES users(id),
  listing_date DATE DEFAULT CURRENT_DATE,
  mls_number VARCHAR(50),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  views_count INT DEFAULT 0
);

CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_type ON properties(property_type);

-- ============================================================================
-- DEVELOPMENTS
-- ============================================================================

CREATE TABLE developments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  developer VARCHAR(255),
  region VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  
  -- Development Details
  units INT NOT NULL,
  estimated_value DECIMAL(15, 2),
  status VARCHAR(50) CHECK (status IN ('pre-construction', 'under-construction', 'available-now', 'sold-out')),
  type VARCHAR(100),
  
  -- Dates
  start_date DATE,
  completion_date DATE,
  
  -- Features
  amenities TEXT[],
  description TEXT,
  
  -- Media
  images TEXT[],
  brochure_url TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_developments_region ON developments(region);
CREATE INDEX idx_developments_status ON developments(status);

-- ============================================================================
-- AGENTS
-- ============================================================================

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  agency_name VARCHAR(255),
  agency_address TEXT,
  license_number VARCHAR(100) NOT NULL,
  nmls_number VARCHAR(50),
  dre_number VARCHAR(50),
  
  -- Contact
  office_phone VARCHAR(20),
  website VARCHAR(255),
  
  -- Profile
  bio TEXT,
  specialties TEXT[],
  languages TEXT[],
  profile_image_url TEXT,
  
  -- Commission
  commission_rate DECIMAL(5, 2) DEFAULT 50.00, -- 50/50 split
  
  -- Stats
  properties_listed INT DEFAULT 0,
  properties_sold INT DEFAULT 0,
  total_sales_volume DECIMAL(15, 2) DEFAULT 0,
  
  -- Status
  verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agents_user ON agents(user_id);
CREATE INDEX idx_agents_status ON agents(status);

-- ============================================================================
-- FORM SUBMISSIONS
-- ============================================================================

CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('buyer_inquiry', 'property_upload', 'agent_registration', 'pre_approval', 'mexico_application', 'appraisal', 'legal_questionnaire')),
  
  -- Submitter Info
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  
  -- Form Data (JSON)
  form_data JSONB NOT NULL,
  
  -- Property Reference
  property_id UUID REFERENCES properties(id),
  
  -- Status
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'archived')),
  assigned_to UUID REFERENCES users(id),
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_forms_type ON form_submissions(form_type);
CREATE INDEX idx_forms_status ON form_submissions(status);
CREATE INDEX idx_forms_email ON form_submissions(email);

-- ============================================================================
-- DOCUMENTS
-- ============================================================================

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id),
  user_id UUID REFERENCES users(id),
  
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size INT,
  file_url TEXT NOT NULL,
  
  document_type VARCHAR(50) CHECK (document_type IN ('listing_agreement', 'disclosure', 'inspection', 'appraisal', 'contract', 'photo', 'other')),
  
  uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_property ON documents(property_id);
CREATE INDEX idx_documents_user ON documents(user_id);

-- ============================================================================
-- BAJA LUXURY ESTABLISHMENTS
-- ============================================================================

CREATE TABLE baja_luxury_establishments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  
  -- Contact
  website TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  
  -- Details
  description TEXT,
  fee VARCHAR(100),
  
  -- Location
  address TEXT,
  city VARCHAR(100),
  coordinates JSONB, -- {lat, lng}
  
  -- Features
  amenities TEXT[],
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_baja_type ON baja_luxury_establishments(type);
CREATE INDEX idx_baja_region ON baja_luxury_establishments(region);

-- ============================================================================
-- MORTGAGE APPLICATIONS
-- ============================================================================

CREATE TABLE mortgage_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  
  -- Loan Details
  loan_type VARCHAR(50) CHECK (loan_type IN ('conventional', 'fha', 'va', 'usda', 'jumbo', 'mexico_cross_border')),
  loan_amount DECIMAL(12, 2) NOT NULL,
  down_payment DECIMAL(12, 2),
  down_payment_percent DECIMAL(5, 2),
  
  -- Applicant Info
  annual_income DECIMAL(12, 2),
  credit_score INT,
  employment_type VARCHAR(50),
  employment_years INT,
  
  -- Property Info
  property_value DECIMAL(12, 2),
  property_type VARCHAR(50),
  occupancy_type VARCHAR(50),
  
  -- Application Data
  application_data JSONB,
  
  -- Status
  status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'denied', 'closed')),
  loan_officer_id UUID REFERENCES users(id),
  
  -- Dates
  submitted_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  decision_date TIMESTAMP
);

CREATE INDEX idx_mortgage_status ON mortgage_applications(status);
CREATE INDEX idx_mortgage_applicant ON mortgage_applications(applicant_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON form_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_developments_updated_at BEFORE UPDATE ON developments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Insert admin user (password: admin123)
INSERT INTO users (email, password_hash, user_type, first_name, last_name) VALUES
('admin@auditdna.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'Admin', 'User');
