import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function USDA() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.0);
  const [loanTerm, setLoanTerm] = useState(15);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'loans', label: 'Loan Programs', icon: '💰' },
    { id: 'calculator', label: 'Calculator', icon: '🧮' },
    { id: 'eligibility', label: 'Eligibility', icon: '✅' },
    { id: 'application', label: 'Application', icon: '📄' },
    { id: 'grants', label: 'Grants', icon: '🏆' },
    { id: 'programs', label: 'Farm Programs', icon: '🚜' },
    { id: 'conservation', label: 'Conservation', icon: '🌱' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'offices', label: 'Find Office', icon: '📍' }
  ];

  const stats = [
    { label: 'Total Loans Issued', value: '$8.2B', change: '+12%', color: '#10b981' },
    { label: 'Active Borrowers', value: '127,000', change: '+8%', color: '#3b82f6' },
    { label: 'Average Loan Size', value: '$64,500', change: '+5%', color: '#8b5cf6' },
    { label: 'Approval Rate', value: '87%', change: '+3%', color: '#f59e0b' }
  ];

  const loanPrograms = [
    {
      name: 'Farm Ownership Loans',
      icon: '🏢',
      limit: 'Up to $600,000',
      rate: '3.5% - 5.0%',
      term: 'Up to 40 years',
      description: 'Purchase farmland, construct buildings, make improvements',
      color: '#10b981'
    },
    {
      name: 'Operating Loans',
      icon: '⚡',
      limit: 'Up to $400,000',
      rate: '3.25% - 4.5%',
      term: 'Up to 7 years',
      description: 'Cover operating expenses, livestock, equipment, family living',
      color: '#3b82f6'
    },
    {
      name: 'Microloans',
      icon: '💵',
      limit: 'Up to $50,000',
      rate: '3.0% - 4.0%',
      term: 'Up to 7 years',
      description: 'Small-scale farmers, specialty crops, value-added production',
      color: '#f59e0b'
    },
    {
      name: 'Emergency Loans',
      icon: '⚠️',
      limit: 'Up to $500,000',
      rate: '3.75%',
      term: 'Up to 20 years',
      description: 'Disaster recovery, production losses, physical losses',
      color: '#ef4444'
    },
    {
      name: 'Youth Loans',
      icon: '👥',
      limit: 'Up to $5,000',
      rate: '2.5%',
      term: 'Up to 5 years',
      description: 'For 4-H, FFA members ages 10-20 for ag projects',
      color: '#8b5cf6'
    },
    {
      name: 'Conservation Loans',
      icon: '🌳',
      limit: 'Up to $300,000',
      rate: '3.5% - 4.5%',
      term: 'Up to 30 years',
      description: 'Environmental improvements, soil conservation, water quality',
      color: '#84cc16'
    }
  ];

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = totalPaid - loanAmount;

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d1fae5 0%, #dbeafe 50%, #e0e7ff 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    headerContent: {
      maxWidth: '1800px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    backBtn: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    content: {
      maxWidth: '1800px',
      margin: '0 auto',
      padding: '40px'
    },
    tabBar: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      marginBottom: '30px',
      display: 'flex',
      overflowX: 'auto',
      padding: '5px'
    },
    tab: {
      flex: 1,
      minWidth: '120px',
      padding: '15px 20px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#6b7280',
      borderRadius: '8px',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      whiteSpace: 'nowrap'
    },
    activeTab: {
      background: '#059669',
      color: 'white',
      boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>🇺🇸 USDA Agricultural Lending & Programs</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '8px'}}>
              Comprehensive financing solutions for American farmers and ranchers
            </p>
          </div>
          <button onClick={() => navigate('/')} style={styles.backBtn}>← Back</button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Tab Navigation */}
        <div style={styles.tabBar}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{...styles.tab, ...(activeTab === tab.id ? styles.activeTab : {})}}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{fontSize: '20px'}}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '30px'}}>Program Overview</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px'}}>
              {stats.map((stat, i) => (
                <div key={i} style={{background: 'white', padding: '25px', borderRadius: '12px', border: `2px solid ${stat.color}20`, boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
                  <p style={{fontSize: '13px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase'}}>{stat.label}</p>
                  <p style={{fontSize: '32px', fontWeight: 'bold', color: stat.color, marginBottom: '8px'}}>{stat.value}</p>
                  <p style={{fontSize: '14px', fontWeight: 'bold', color: '#10b981'}}>{stat.change} vs last year</p>
                </div>
              ))}
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px'}}>
              {[
                {title: 'Get Started', desc: 'New to USDA lending? Start your journey here.', color: '#10b981', btn: 'Check Eligibility'},
                {title: 'Calculate Payments', desc: 'Estimate your monthly loan payments.', color: '#3b82f6', btn: 'Use Calculator'},
                {title: 'Find Your Office', desc: 'Connect with local USDA representatives.', color: '#8b5cf6', btn: 'Locate Office'}
              ].map((card, i) => (
                <div key={i} style={{background: `${card.color}10`, padding: '30px', borderRadius: '12px', border: `2px solid ${card.color}40`}}>
                  <h3 style={{fontSize: '22px', fontWeight: 'bold', color: card.color, marginBottom: '12px'}}>{card.title}</h3>
                  <p style={{color: '#374151', marginBottom: '20px', lineHeight: '1.6'}}>{card.desc}</p>
                  <button style={{background: card.color, color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'}}>
                    {card.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loan Programs Tab */}
        {activeTab === 'loans' && (
          <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '30px'}}>USDA Loan Programs</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '25px'}}>
              {loanPrograms.map((program, i) => (
                <div key={i} style={{background: 'white', padding: '30px', borderRadius: '15px', border: `3px solid ${program.color}40`, transition: 'all 0.3s', cursor: 'pointer'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = program.color;
                    e.currentTarget.style.boxShadow = `0 12px 35px ${program.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = program.color + '40';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '20px'}}>
                    <div style={{fontSize: '48px'}}>{program.icon}</div>
                    <div style={{flex: 1}}>
                      <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px'}}>{program.name}</h3>
                      <p style={{color: '#6b7280', fontSize: '14px', lineHeight: '1.6'}}>{program.description}</p>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', paddingTop: '20px', borderTop: '2px solid #f3f4f6'}}>
                    <div>
                      <p style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>LOAN LIMIT</p>
                      <p style={{fontSize: '14px', fontWeight: 'bold', color: program.color}}>{program.limit}</p>
                    </div>
                    <div>
                      <p style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>RATE</p>
                      <p style={{fontSize: '14px', fontWeight: 'bold', color: '#3b82f6'}}>{program.rate}</p>
                    </div>
                    <div>
                      <p style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>MAX TERM</p>
                      <p style={{fontSize: '14px', fontWeight: 'bold', color: '#8b5cf6'}}>{program.term}</p>
                    </div>
                  </div>
                  
                  <button style={{width: '100%', marginTop: '20px', padding: '14px', background: program.color, color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'}}>
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '30px'}}>Loan Calculator</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px'}}>
              <div>
                <div style={{marginBottom: '30px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#065f46', marginBottom: '12px'}}>
                    Loan Amount: ${loanAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="600000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    style={{width: '100%', height: '8px', borderRadius: '4px', outline: 'none', background: '#d1fae5'}}
                  />
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>
                    <span>$10,000</span>
                    <span>$600,000</span>
                  </div>
                </div>

                <div style={{marginBottom: '30px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#065f46', marginBottom: '12px'}}>
                    Interest Rate: {interestRate.toFixed(2)}%
                  </label>
                  <input
                    type="range"
                    min="2.5"
                    max="8.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={{width: '100%', height: '8px', borderRadius: '4px', outline: 'none', background: '#dbeafe'}}
                  />
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>
                    <span>2.5%</span>
                    <span>8.0%</span>
                  </div>
                </div>

                <div style={{marginBottom: '30px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#065f46', marginBottom: '12px'}}>
                    Loan Term: {loanTerm} years
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    style={{width: '100%', height: '8px', borderRadius: '4px', outline: 'none', background: '#e0e7ff'}}
                  />
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>
                    <span>5 years</span>
                    <span>40 years</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '12px', padding: '30px', color: 'white', marginBottom: '20px'}}>
                  <p style={{fontSize: '14px', opacity: 0.9, marginBottom: '10px'}}>Monthly Payment</p>
                  <p style={{fontSize: '48px', fontWeight: 'bold'}}>${monthlyPayment.toFixed(2)}</p>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '25px', border: '2px solid #e5e7eb', marginBottom: '20px'}}>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div>
                      <p style={{fontSize: '13px', color: '#6b7280', marginBottom: '8px'}}>Total Paid</p>
                      <p style={{fontSize: '28px', fontWeight: 'bold', color: '#065f46'}}>${totalPaid.toFixed(0)}</p>
                    </div>
                    <div>
                      <p style={{fontSize: '13px', color: '#6b7280', marginBottom: '8px'}}>Total Interest</p>
                      <p style={{fontSize: '28px', fontWeight: 'bold', color: '#f59e0b'}}>${totalInterest.toFixed(0)}</p>
                    </div>
                  </div>
                </div>

                <div style={{background: '#dbeafe', borderRadius: '12px', padding: '20px', border: '1px solid #3b82f6'}}>
                  <p style={{fontSize: '14px', color: '#1e40af', lineHeight: '1.6'}}>
                    <strong>Tip:</strong> Making extra payments can significantly reduce your total interest paid over the life of the loan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {!['overview', 'loans', 'calculator'].includes(activeTab) && (
          <div style={{background: 'white', borderRadius: '12px', padding: '60px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p style={{fontSize: '16px', color: '#6b7280', marginBottom: '30px'}}>This section is under development.</p>
            <div style={{background: 'linear-gradient(135deg, #d1fae5 0%, #dbeafe 100%)', borderRadius: '12px', padding: '40px', maxWidth: '600px', margin: '0 auto'}}>
              <p style={{fontSize: '18px', color: '#065f46', fontWeight: '600'}}>
                We are building amazing features for this section. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

