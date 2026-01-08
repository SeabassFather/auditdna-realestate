import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function FinTechQuoteEngine() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    propertyValue: '', downPayment: '', creditScore: '', loanType: 'conventional'
  });
  const [quote, setQuote] = useState(null);

  const calculateQuote = () => {
    const value = parseFloat(formData.propertyValue);
    const down = parseFloat(formData.downPayment);
    const loanAmount = value - down;

    const rates = {
      conventional: { rate: 6.875, apr: 7.12, pmi: 0.5 },
      fha: { rate: 6.5, apr: 6.85, pmi: 0.85 },
      va: { rate: 6.25, apr: 6.48, pmi: 0 }
    };

    const loanData = rates[formData.loanType];
    const monthlyRate = loanData.rate / 100 / 12;
    const payments = 30 * 12;
    
    const principal = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
                     (Math.pow(1 + monthlyRate, payments) - 1);
    
    const pmi = loanData.pmi > 0 ? (loanAmount * loanData.pmi / 100 / 12) : 0;
    const total = principal + pmi;

    setQuote({
      loanAmount,
      monthlyPayment: Math.round(total),
      principalPayment: Math.round(principal),
      pmiPayment: Math.round(pmi),
      rate: loanData.rate,
      apr: loanData.apr,
      totalInterest: Math.round((principal * payments) - loanAmount),
      downPaymentPercent: ((down / value) * 100).toFixed(1)
    });
  };

  const styles = {
    container: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '2px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '600px',
      margin: '0 auto'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #cba658, #f5d372)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '24px',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '14px',
      background: 'rgba(30, 41, 59, 0.8)',
      border: '2px solid rgba(203, 166, 88, 0.2)',
      borderRadius: '8px',
      color: '#f1f5f9',
      fontSize: '16px',
      marginBottom: '16px'
    },
    button: {
      width: '100%',
      padding: '16px',
      background: 'linear-gradient(135deg, #cba658, #b8944d)',
      color: '#0f172a',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '16px'
    },
    quoteCard: {
      background: 'rgba(59, 130, 246, 0.1)',
      border: '2px solid #3b82f6',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '24px'
    },
    quoteRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
      fontSize: '14px'
    },
    quoteLabel: {
      color: '#94a3b8'
    },
    quoteValue: {
      color: '#f1f5f9',
      fontWeight: '700'
    },
    highlight: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#10b981',
      textAlign: 'center',
      padding: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {language === 'es' ? ' Cotización Instantánea' : ' Instant Loan Quote'}
      </h2>

      <input
        type="number"
        placeholder={language === 'es' ? 'Valor de la Propiedad ($)' : 'Property Value ($)'}
        value={formData.propertyValue}
        onChange={(e) => setFormData({...formData, propertyValue: e.target.value})}
        style={styles.input}
      />

      <input
        type="number"
        placeholder={language === 'es' ? 'Enganche ($)' : 'Down Payment ($)'}
        value={formData.downPayment}
        onChange={(e) => setFormData({...formData, downPayment: e.target.value})}
        style={styles.input}
      />

      <input
        type="number"
        placeholder={language === 'es' ? 'Puntaje de Crédito' : 'Credit Score'}
        value={formData.creditScore}
        onChange={(e) => setFormData({...formData, creditScore: e.target.value})}
        style={styles.input}
      />

      <select
        value={formData.loanType}
        onChange={(e) => setFormData({...formData, loanType: e.target.value})}
        style={styles.input}
      >
        <option value="conventional">Conventional</option>
        <option value="fha">FHA</option>
        <option value="va">VA</option>
      </select>

      <button onClick={calculateQuote} style={styles.button}>
        {language === 'es' ? ' Calcular Cotización' : ' Calculate Quote'}
      </button>

      {quote && (
        <div style={styles.quoteCard}>
          <div style={styles.highlight}>
            ${quote.monthlyPayment.toLocaleString()}/mo
          </div>

          <div style={styles.quoteRow}>
            <span style={styles.quoteLabel}>Loan Amount</span>
            <span style={styles.quoteValue}>${quote.loanAmount.toLocaleString()}</span>
          </div>

          <div style={styles.quoteRow}>
            <span style={styles.quoteLabel}>Interest Rate</span>
            <span style={styles.quoteValue}>{quote.rate}%</span>
          </div>

          <div style={styles.quoteRow}>
            <span style={styles.quoteLabel}>APR</span>
            <span style={styles.quoteValue}>{quote.apr}%</span>
          </div>

          <div style={styles.quoteRow}>
            <span style={styles.quoteLabel}>Principal & Interest</span>
            <span style={styles.quoteValue}>${quote.principalPayment.toLocaleString()}</span>
          </div>

          {quote.pmiPayment > 0 && (
            <div style={styles.quoteRow}>
              <span style={styles.quoteLabel}>PMI</span>
              <span style={styles.quoteValue}>${quote.pmiPayment.toLocaleString()}</span>
            </div>
          )}

          <div style={styles.quoteRow}>
            <span style={styles.quoteLabel}>Down Payment</span>
            <span style={styles.quoteValue}>{quote.downPaymentPercent}%</span>
          </div>

          <div style={styles.quoteRow}>
            <span style={styles.quoteLabel}>Total Interest</span>
            <span style={styles.quoteValue}>${quote.totalInterest.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}