import React, { useState } from 'react';

export default function URLA1003() {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    // Section 1: Borrower Information
    firstName: '', middleName: '', lastName: '', suffix: '',
    ssn: '', dob: '', citizenship: '', yearsInSchool: '',
    maritalStatus: '', dependents: '', dependentAges: '',
    email: '', phone: '', cellPhone: '',
    currentAddress: '', currentCity: '', currentState: '', currentZip: '',
    yearsAtAddress: '', monthsAtAddress: '', residencyType: '',
    previousAddress: '', previousCity: '', previousState: '', previousZip: '',
    
    // Section 2: Property & Loan
    propertyAddress: '', propertyCity: '', propertyState: '', propertyZip: '',
    propertyType: '', occupancy: '', units: '',
    loanAmount: '', loanPurpose: '', purchasePrice: '',
    downPayment: '', loanType: '', term: '',
    
    // Section 3: Employment
    currentEmployer: '', employerAddress: '', employerCity: '', employerState: '', employerZip: '',
    employerPhone: '', position: '', yearsEmployed: '', monthsEmployed: '',
    monthlyIncome: '', selfEmployed: '',
    previousEmployer: '', previousPosition: '', previousYears: '', previousIncome: '',
    otherIncome: '', otherIncomeSource: '',
    
    // Section 4: Assets
    checkingBalance: '', savingsBalance: '', stocksValue: '',
    retirementValue: '', otherAssets: '', otherAssetsDesc: '',
    
    // Section 5: Liabilities
    creditCard1: '', creditCard1Balance: '', creditCard1Payment: '',
    carLoan: '', carLoanBalance: '', carLoanPayment: '',
    studentLoan: '', studentLoanBalance: '', studentLoanPayment: '',
    otherLiability: '', otherLiabilityBalance: '', otherLiabilityPayment: '',
    
    // Section 6: Real Estate Owned
    ownRealEstate: '', ownedAddress: '', ownedValue: '', ownedMortgage: '',
    rentalIncome: '',
    
    // Section 7: Declarations
    bankruptcy: '', foreclosure: '', lawsuit: '', loanOnProperty: '',
    coSigner: '', citizenshipStatus: '', permanentResident: '',
    
    // Section 8: Demographics (Optional)
    ethnicity: '', race: '', sex: '',
    
    // Section 9: Military
    militaryService: '', branch: '', serviceYears: ''
  });

  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  const nextSection = () => {
    if (currentSection < 9) setCurrentSection(currentSection + 1);
  };

  const prevSection = () => {
    if (currentSection > 1) setCurrentSection(currentSection - 1);
  };

  const handleSubmit = () => {
    alert('Application submitted successfully!');
    console.log('Form Data:', formData);
  };

  const InputField = ({ label, field, type = 'text', placeholder = '', required = false, options = null }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
        {label}{required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {options ? (
        <select value={formData[field]} onChange={(e) => updateField(field, e.target.value)}
          style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }}>
          <option value="">Select...</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} value={formData[field]} onChange={(e) => updateField(field, e.target.value)}
          placeholder={placeholder}
          style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }} />
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#f1f5f9', marginBottom: '8px' }}>1003 URLA Form</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>Uniform Residential Loan Application</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(step => (
            <div key={step} style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: currentSection >= step ? '#3b82f6' : '#1e293b',
              border: currentSection >= step ? '2px solid #60a5fa' : '2px solid #334155',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: '700', 
              color: currentSection >= step ? '#fff' : '#64748b'
            }}>
              {step}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '40px' }}>
          {currentSection === 1 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>1. Borrower Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <InputField label="First Name" field="firstName" required placeholder="John" />
                <InputField label="Middle Name" field="middleName" placeholder="Michael" />
                <InputField label="Last Name" field="lastName" required placeholder="Smith" />
                <InputField label="Suffix" field="suffix" placeholder="Jr, Sr, III" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Social Security Number" field="ssn" required placeholder="123-45-6789" />
                <InputField label="Date of Birth" field="dob" type="date" required />
                <InputField label="Citizenship" field="citizenship" required options={['US Citizen', 'Permanent Resident', 'Non-Permanent Resident']} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Marital Status" field="maritalStatus" required options={['Married', 'Unmarried', 'Separated']} />
                <InputField label="Number of Dependents" field="dependents" type="number" placeholder="2" />
                <InputField label="Dependent Ages" field="dependentAges" placeholder="5, 8" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Email Address" field="email" type="email" required placeholder="john@example.com" />
                <InputField label="Home Phone" field="phone" placeholder="(555) 123-4567" />
                <InputField label="Cell Phone" field="cellPhone" required placeholder="(555) 987-6543" />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginTop: '32px', marginBottom: '20px' }}>Current Address</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '20px' }}>
                <InputField label="Street Address" field="currentAddress" required placeholder="123 Main St" />
                <InputField label="City" field="currentCity" required placeholder="San Diego" />
                <InputField label="State" field="currentState" required placeholder="CA" />
                <InputField label="Zip Code" field="currentZip" required placeholder="92101" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Years at Address" field="yearsAtAddress" type="number" required placeholder="3" />
                <InputField label="Months at Address" field="monthsAtAddress" type="number" required placeholder="6" />
                <InputField label="Residency Type" field="residencyType" required options={['Own', 'Rent', 'Living Rent Free']} />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginTop: '32px', marginBottom: '20px' }}>Previous Address (if less than 2 years at current)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '20px' }}>
                <InputField label="Street Address" field="previousAddress" placeholder="456 Oak Ave" />
                <InputField label="City" field="previousCity" placeholder="Los Angeles" />
                <InputField label="State" field="previousState" placeholder="CA" />
                <InputField label="Zip Code" field="previousZip" placeholder="90001" />
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>2. Property Information & Loan Purpose</h2>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginBottom: '20px' }}>Subject Property Address</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '20px' }}>
                <InputField label="Street Address" field="propertyAddress" required placeholder="789 Beach Blvd" />
                <InputField label="City" field="propertyCity" required placeholder="San Diego" />
                <InputField label="State" field="propertyState" required placeholder="CA" />
                <InputField label="Zip Code" field="propertyZip" required placeholder="92109" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '24px' }}>
                <InputField label="Property Type" field="propertyType" required options={['Single Family', 'Condo', 'Townhouse', 'Multi-Family (2-4 units)']} />
                <InputField label="Occupancy" field="occupancy" required options={['Primary Residence', 'Second Home', 'Investment Property']} />
                <InputField label="Number of Units" field="units" type="number" required placeholder="1" />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginTop: '32px', marginBottom: '20px' }}>Loan Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Loan Amount" field="loanAmount" type="number" required placeholder="400000" />
                <InputField label="Loan Purpose" field="loanPurpose" required options={['Purchase', 'Refinance', 'Cash-Out Refinance', 'Construction']} />
                <InputField label="Loan Type" field="loanType" required options={['Conventional', 'FHA', 'VA', 'USDA']} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Purchase Price" field="purchasePrice" type="number" required placeholder="500000" />
                <InputField label="Down Payment" field="downPayment" type="number" required placeholder="100000" />
                <InputField label="Loan Term (years)" field="term" type="number" required placeholder="30" />
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>3. Employment & Income</h2>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginBottom: '20px' }}>Current Employment</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <InputField label="Employer Name" field="currentEmployer" required placeholder="ABC Corporation" />
                <InputField label="Position/Title" field="position" required placeholder="Software Engineer" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '20px' }}>
                <InputField label="Employer Address" field="employerAddress" required placeholder="100 Business Pkwy" />
                <InputField label="City" field="employerCity" required placeholder="San Diego" />
                <InputField label="State" field="employerState" required placeholder="CA" />
                <InputField label="Zip" field="employerZip" required placeholder="92101" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <InputField label="Phone" field="employerPhone" required placeholder="(555) 555-5555" />
                <InputField label="Years Employed" field="yearsEmployed" type="number" required placeholder="5" />
                <InputField label="Months" field="monthsEmployed" type="number" required placeholder="6" />
                <InputField label="Self-Employed?" field="selfEmployed" options={['No', 'Yes']} />
              </div>

              <InputField label="Monthly Income (Gross)" field="monthlyIncome" type="number" required placeholder="8500" />

              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginTop: '32px', marginBottom: '20px' }}>Previous Employment (if less than 2 years at current)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Previous Employer" field="previousEmployer" placeholder="XYZ Company" />
                <InputField label="Position" field="previousPosition" placeholder="Developer" />
                <InputField label="Years Employed" field="previousYears" type="number" placeholder="3" />
              </div>
              <InputField label="Monthly Income" field="previousIncome" type="number" placeholder="6500" />

              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginTop: '32px', marginBottom: '20px' }}>Other Income</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <InputField label="Monthly Amount" field="otherIncome" type="number" placeholder="1500" />
                <InputField label="Source" field="otherIncomeSource" placeholder="Rental, Bonus, Commission, etc." />
              </div>
            </div>
          )}

          {currentSection === 4 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>4. Assets</h2>
              
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
                List all bank accounts, investments, and assets that will be used for this loan.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <InputField label="Checking Account Balance" field="checkingBalance" type="number" required placeholder="15000" />
                <InputField label="Savings Account Balance" field="savingsBalance" type="number" required placeholder="50000" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <InputField label="Stocks/Bonds Value" field="stocksValue" type="number" placeholder="75000" />
                <InputField label="Retirement Accounts (401k, IRA)" field="retirementValue" type="number" placeholder="200000" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <InputField label="Other Assets Value" field="otherAssets" type="number" placeholder="25000" />
                <InputField label="Other Assets Description" field="otherAssetsDesc" placeholder="Vehicle, Business Assets, etc." />
              </div>

              <div style={{ marginTop: '24px', padding: '20px', background: '#1e3a8a', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#60a5fa', marginBottom: '12px' }}>Total Assets</h4>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>
                  ${(
                    Number(formData.checkingBalance || 0) +
                    Number(formData.savingsBalance || 0) +
                    Number(formData.stocksValue || 0) +
                    Number(formData.retirementValue || 0) +
                    Number(formData.otherAssets || 0)
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {currentSection === 5 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>5. Liabilities & Debts</h2>
              
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
                List all credit cards, loans, and monthly obligations.
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '16px' }}>Credit Card 1</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <InputField label="Creditor Name" field="creditCard1" placeholder="Chase Visa" />
                <InputField label="Balance" field="creditCard1Balance" type="number" placeholder="5000" />
                <InputField label="Monthly Payment" field="creditCard1Payment" type="number" placeholder="150" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '16px' }}>Auto Loan</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <InputField label="Lender" field="carLoan" placeholder="Toyota Financial" />
                <InputField label="Balance" field="carLoanBalance" type="number" placeholder="25000" />
                <InputField label="Monthly Payment" field="carLoanPayment" type="number" placeholder="450" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '16px' }}>Student Loan</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <InputField label="Lender" field="studentLoan" placeholder="Federal Loan" />
                <InputField label="Balance" field="studentLoanBalance" type="number" placeholder="40000" />
                <InputField label="Monthly Payment" field="studentLoanPayment" type="number" placeholder="300" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '16px' }}>Other Liability</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <InputField label="Creditor" field="otherLiability" placeholder="Personal Loan, Child Support, etc." />
                <InputField label="Balance" field="otherLiabilityBalance" type="number" placeholder="10000" />
                <InputField label="Monthly Payment" field="otherLiabilityPayment" type="number" placeholder="200" />
              </div>

              <div style={{ marginTop: '24px', padding: '20px', background: '#7c2d12', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#fb923c', marginBottom: '12px' }}>Total Monthly Debt Payments</h4>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>
                  ${(
                    Number(formData.creditCard1Payment || 0) +
                    Number(formData.carLoanPayment || 0) +
                    Number(formData.studentLoanPayment || 0) +
                    Number(formData.otherLiabilityPayment || 0)
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {currentSection === 6 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>6. Real Estate Owned</h2>
              
              <InputField label="Do you own any other real estate?" field="ownRealEstate" options={['No', 'Yes']} />

              {formData.ownRealEstate === 'Yes' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '24px' }}>
                    <InputField label="Property Address" field="ownedAddress" required placeholder="321 Rental St, City, ST 12345" />
                    <InputField label="Property Value" field="ownedValue" type="number" required placeholder="350000" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <InputField label="Mortgage Balance" field="ownedMortgage" type="number" placeholder="200000" />
                    <InputField label="Monthly Rental Income" field="rentalIncome" type="number" placeholder="2500" />
                  </div>
                </>
              )}
            </div>
          )}

          {currentSection === 7 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>7. Declarations</h2>
              
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
                Answer all questions honestly. These declarations are required by federal law.
              </p>

              <InputField label="Are you a US Citizen?" field="citizenshipStatus" required options={['Yes', 'No']} />
              
              {formData.citizenshipStatus === 'No' && (
                <InputField label="Are you a Permanent Resident?" field="permanentResident" required options={['Yes', 'No']} />
              )}

              <InputField label="Have you filed for bankruptcy in the past 7 years?" field="bankruptcy" required options={['No', 'Yes']} />
              
              <InputField label="Have you had property foreclosed in the past 7 years?" field="foreclosure" required options={['No', 'Yes']} />
              
              <InputField label="Are you currently involved in any lawsuit?" field="lawsuit" required options={['No', 'Yes']} />
              
              <InputField label="Have you conveyed title to any property in lieu of foreclosure?" field="loanOnProperty" required options={['No', 'Yes']} />
              
              <InputField label="Are you a co-signer or guarantor on any debt?" field="coSigner" required options={['No', 'Yes']} />
            </div>
          )}

          {currentSection === 8 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>8. Demographic Information</h2>
              
              <div style={{ padding: '20px', background: '#1e3a8a', borderRadius: '8px', marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', color: '#93c5fd', lineHeight: '1.6' }}>
                  This information is requested by the federal government to monitor compliance with federal anti-discrimination laws. 
                  You are not required to provide this information, but are encouraged to do so.
                </p>
              </div>

              <InputField label="Ethnicity" field="ethnicity" options={['I do not wish to provide', 'Hispanic or Latino', 'Not Hispanic or Latino']} />
              
              <InputField label="Race" field="race" options={[
                'I do not wish to provide',
                'American Indian or Alaska Native',
                'Asian',
                'Black or African American',
                'Native Hawaiian or Other Pacific Islander',
                'White'
              ]} />
              
              <InputField label="Sex" field="sex" options={['I do not wish to provide', 'Female', 'Male']} />
            </div>
          )}

          {currentSection === 9 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '32px' }}>9. Military Service & Final Review</h2>
              
              <InputField label="Have you served in the US Military?" field="militaryService" required options={['No', 'Yes']} />
              
              {formData.militaryService === 'Yes' && (
                <>
                  <InputField label="Branch" field="branch" required options={['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force']} />
                  <InputField label="Years of Service" field="serviceYears" type="number" required placeholder="4" />
                </>
              )}

              <div style={{ marginTop: '40px', padding: '24px', background: '#14532d', border: '2px solid #16a34a', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#4ade80', marginBottom: '16px' }}>Ready to Submit</h3>
                <p style={{ fontSize: '14px', color: '#86efac', lineHeight: '1.6', marginBottom: '20px' }}>
                  By clicking Submit, I certify that the information provided in this application is true and complete. 
                  I understand that any intentional or negligent misrepresentation may result in civil liability and/or criminal penalties.
                </p>
                <button onClick={handleSubmit} style={{
                  width: '100%', padding: '16px', background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px',
                  fontWeight: '700', cursor: 'pointer'
                }}>
                  Submit 1003 Application
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '32px', borderTop: '2px solid #334155' }}>
            <button onClick={prevSection} disabled={currentSection === 1} style={{
              padding: '14px 32px', background: currentSection === 1 ? '#1e293b' : '#334155',
              color: currentSection === 1 ? '#64748b' : '#f1f5f9', border: 'none',
              borderRadius: '8px', fontSize: '16px', fontWeight: '600',
              cursor: currentSection === 1 ? 'not-allowed' : 'pointer'
            }}>
              Previous
            </button>
            
            {currentSection < 9 && (
              <button onClick={nextSection} style={{
                padding: '14px 32px', background: '#3b82f6', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '16px',
                fontWeight: '600', cursor: 'pointer'
              }}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}