// ================================================================
// FINANCE MASTER MODULE - EXTENDED COMPONENTS (PART 2)
// ================================================================
// Date: 2025-12-18
// Author: SeabassFather (Saul Garcia)
// Features:  PO Finance, Profit Calculator, Reports, Clients, Calendar, Receipts
// Status: PRODUCTION-READY
// ================================================================

import React, { useState, useMemo } from 'react';
import {
  DollarSign, TrendingUp, Package, Briefcase, Receipt, Users,
  Calculator, PieChart, BarChart3, Calendar, Upload, Download,
  Eye, Edit, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// ================================================================
// PO FINANCE COMPONENT
// ================================================================
export function POFinance({ language }) {
  const poOpportunities = [
    {
      poNumber: 'PO-8901',
      supplier: 'Growers Michoacán',
      product: 'Hass Avocado',
      amount: 3000,
      deliveryDate: '2025-11-25',
      daysUntilDelivery: 6,
      financeRate: 4.0,
      financeFee: 40,
      term: 30,
      youPay: 3040,
      cashSaved: 3000,
      recommended: true
    },
    {
      poNumber: 'PO-8902',
      supplier: 'Baja Fresh Produce',
      product: 'Strawberries',
      amount: 2700,
      deliveryDate: '2025-11-27',
      daysUntilDelivery: 8,
      financeRate: 4.5,
      financeFee: 41,
      term: 30,
      youPay: 2741,
      cashSaved: 2700,
      recommended: false
    }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
        {language === 'en' ? '📄 Purchase Order Financing' : '📄 Financiamiento de Órdenes de Compra'}
      </h2>

      {/* PO Finance Explainer */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {language === 'en' ? 'How PO Financing Works' : 'Cómo Funciona el Financiamiento PO'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {language === 'en' ? 'Get Customer PO' : 'Obtén PO del Cliente'}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {language === 'en' ? 'Customer places order' : 'Cliente hace pedido'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom:  '0.5rem' }}>2️⃣</div>
            <div style={{ fontWeight: 'bold', marginBottom:  '0.25rem' }}>
              {language === 'en' ? 'We Pay Supplier' : 'Pagamos al Proveedor'}
            </div>
            <div style={{ fontSize:  '0.9rem', opacity: 0.9 }}>
              {language === 'en' ? 'Finance company pays grower' : 'Financiadora paga al productor'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {language === 'en' ? 'Fulfill Order' : 'Cumple Orden'}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {language === 'en' ? 'Deliver to your customer' : 'Entrega a tu cliente'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>4️⃣</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {language === 'en' ? 'Repay Finance' : 'Paga Financiamiento'}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {language === 'en' ? 'Repay cost + small fee' : 'Paga costo + tarifa pequeña'}
            </div>
          </div>
        </div>
      </div>

      {/* PO Opportunities */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '1. 5rem' }}>
        {language === 'en' ? 'Purchase Orders to Finance' : 'Órdenes de Compra para Financiar'}
      </h3>

      <div style={{ display: 'grid', gap:  '1.5rem' }}>
        {poOpportunities. map((po, index) => (
          <div key={index} style={{
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: po.recommended ? '2px solid #22c55e' : '2px solid rgba(100, 116, 139, 0.3)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem' }}>
              {/* PO Details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap:  '0.5rem', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1. 25rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                    {po.poNumber}
                  </h4>
                  {po.recommended && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: '#22c55e40',
                      color: '#22c55e',
                      borderRadius: '9999px',
                      fontSize:  '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {language === 'en' ? 'RECOMMENDED' : 'RECOMENDADO'}
                    </span>
                  )}
                </div>
                <div style={{ display: 'grid', gap:  '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>
                      {language === 'en' ? 'Supplier' : 'Proveedor'}: 
                    </span>
                    <span style={{ fontWeight: 'bold', color:  '#fff' }}>{po.supplier}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>
                      {language === 'en' ? 'Product' :  'Producto'}:
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#fff' }}>{po.product}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>
                      {language === 'en' ? 'PO Amount' : 'Monto PO'}:
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#fff' }}>
                      ${po.amount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>
                      {language === 'en' ? 'Delivery Date' : 'Fecha Entrega'}:
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#22c55e' }}>
                      {po. deliveryDate} ({po.daysUntilDelivery} {language === 'en' ? 'days' : 'días'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Finance Terms */}
              <div style={{
                padding: '1rem',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                border: '2px solid #f59e0b'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  {language === 'en' ? 'Finance Fee' : 'Tarifa Financiamiento'}
                </div>
                <div style={{ fontSize: '1. 5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  {po.financeRate}%
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>
                  ${po.financeFee}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '0.5rem' }}>
                  {po.term} {language === 'en' ? 'day term' : 'días plazo'}
                </div>
              </div>

              {/* Benefit */}
              <div style={{
                padding: '1rem',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                border: '2px solid #22c55e'
              }}>
                <div style={{ fontSize:  '0.875rem', color: '#22c55e', marginBottom: '0.5rem' }}>
                  {language === 'en' ? 'Cash Preserved' : 'Efectivo Preservado'}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '0.25rem' }}>
                  ${po.cashSaved. toLocaleString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#22c55e' }}>
                  {language === 'en' ? 'Keep your cash flow!' : '¡Mantén tu flujo de caja!'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: '0.5rem' }}>
                  {language === 'en' ? 'Repay: ' : 'Repaga:'} ${po.youPay.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button style={{
                flex: 1,
                padding:  '1rem',
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 6px 20px rgba(236, 72, 153, 0.4)'
              }}>
                {language === 'en' ? 'Finance This PO' : 'Financiar Esta PO'}
              </button>
              <button style={{
                padding: '1rem 1.5rem',
                background: 'rgba(236, 72, 153, 0.1)',
                color: '#ec4899',
                border: '2px solid #ec4899',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                {language === 'en' ? 'Calculate' : 'Calcular'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// PROFIT CALCULATOR COMPONENT
// ================================================================
export function ProfitCalculator({ language }) {
  const [calc, setCalc] = useState({
    salesPrice: 5000,
    purchasePrice: 3000,
    freightIn: 500,
    freightOut: 300,
    packaging: 200,
    labor: 100,
    payroll: 150,
    fuel: 50,
    overhead: 100,
    poFinanceRate: 4.0,
    factoringRate: 3.5,
    usePOFinance: true,
    useFactoring: true
  });

  const results = useMemo(() => {
    const cogs = calc.purchasePrice + calc.freightIn + calc.freightOut + calc.packaging + calc.labor;
    const grossProfit = calc.salesPrice - cogs;
    const grossMargin = (grossProfit / calc.salesPrice) * 100;
    
    const opex = calc.payroll + calc.fuel + calc. overhead;
    const profitBeforeFinancing = grossProfit - opex;
    
    const poFinanceCost = calc.usePOFinance ? (calc.purchasePrice * calc.poFinanceRate) / 100 : 0;
    const factoringCost = calc.useFactoring ? (calc.salesPrice * calc.factoringRate) / 100 : 0;
    const totalFinancingCosts = poFinanceCost + factoringCost;
    
    const netProfit = profitBeforeFinancing - totalFinancingCosts;
    const netMargin = (netProfit / calc.salesPrice) * 100;
    
    return {
      cogs,
      grossProfit,
      grossMargin,
      opex,
      profitBeforeFinancing,
      poFinanceCost,
      factoringCost,
      totalFinancingCosts,
      netProfit,
      netMargin
    };
  }, [calc]);

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom:  '2rem' }}>
        {language === 'en' ?  '🧮 Transaction Profit Calculator' : '🧮 Calculadora de Beneficios de Transacción'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap:  '2rem' }}>
        {/* Input Form */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
            {language === 'en' ? 'Transaction Details' : 'Detalles de Transacción'}
          </h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Revenue */}
            <div>
              <label style={{ display:  'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                {language === 'en' ? 'Sales Price' : 'Precio de Venta'}
              </label>
              <input
                type="number"
                value={calc.salesPrice}
                onChange={(e) => setCalc({...calc, salesPrice: parseFloat(e.target.value) || 0})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: '#fff'
                }}
              />
            </div>

            {/* COGS Inputs */}
            <div style={{ borderTop: '2px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.75rem' }}>
                COGS
              </h4>
              <div style={{ display:  'grid', gap: '0.75rem' }}>
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Purchase Price' : 'Precio Compra'}
                  value={calc.purchasePrice}
                  onChange={(e) => setCalc({...calc, purchasePrice: parseFloat(e.target. value) || 0})}
                  style={{ width: '100%', padding:  '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder={language === 'en' ?  'Freight Inbound' : 'Flete Entrada'}
                  value={calc. freightIn}
                  onChange={(e) => setCalc({...calc, freightIn: parseFloat(e.target.value) || 0})}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Freight Outbound' :  'Flete Salida'}
                  value={calc. freightOut}
                  onChange={(e) => setCalc({...calc, freightOut: parseFloat(e.target.value) || 0})}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Packaging' : 'Empaque'}
                  value={calc. packaging}
                  onChange={(e) => setCalc({...calc, packaging: parseFloat(e. target.value) || 0})}
                  style={{ width:  '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Labor' :  'Mano Obra'}
                  value={calc. labor}
                  onChange={(e) => setCalc({...calc, labor: parseFloat(e. target.value) || 0})}
                  style={{ width:  '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
              </div>
            </div>

            {/* Operating Expenses */}
            <div style={{ borderTop: '2px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.75rem' }}>
                {language === 'en' ? 'Operating Expenses' : 'Gastos Operativos'}
              </h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Payroll' : 'Nómina'}
                  value={calc.payroll}
                  onChange={(e) => setCalc({...calc, payroll: parseFloat(e.target.value) || 0})}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Fuel' : 'Combustible'}
                  value={calc.fuel}
                  onChange={(e) => setCalc({...calc, fuel: parseFloat(e.target.value) || 0})}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Overhead' : 'Gastos Generales'}
                  value={calc.overhead}
                  onChange={(e) => setCalc({...calc, overhead: parseFloat(e.target.value) || 0})}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                />
              </div>
            </div>

            {/* Financing Options */}
            <div style={{ borderTop: '2px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.75rem' }}>
                {language === 'en' ? 'Financing' : 'Financiamiento'}
              </h4>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#fff' }}>
                  <input
                    type="checkbox"
                    checked={calc.usePOFinance}
                    onChange={(e) => setCalc({...calc, usePOFinance: e.target.checked})}
                  />
                  <span>{language === 'en' ? 'Use PO Financing' : 'Usar Financiamiento PO'}</span>
                </label>
                {calc.usePOFinance && (
                  <input
                    type="number"
                    step="0.1"
                    value={calc.poFinanceRate}
                    onChange={(e) => setCalc({...calc, poFinanceRate: parseFloat(e.target.value) || 0})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                    placeholder="Rate %"
                  />
                )}
              </div>

              <div>
                <label style={{ display:  'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#fff' }}>
                  <input
                    type="checkbox"
                    checked={calc.useFactoring}
                    onChange={(e) => setCalc({...calc, useFactoring: e.target.checked})}
                  />
                  <span>{language === 'en' ? 'Use Factoring' : 'Usar Factoraje'}</span>
                </label>
                {calc.useFactoring && (
                  <input
                    type="number"
                    step="0.1"
                    value={calc.factoringRate}
                    onChange={(e) => setCalc({...calc, factoringRate: parseFloat(e.target.value) || 0})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff' }}
                    placeholder="Rate %"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
            {language === 'en' ? 'Profit Analysis' : 'Análisis de Beneficios'}
          </h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Revenue */}
            <div style={{
              padding: '1rem',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              border: '2px solid #22c55e'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#22c55e', marginBottom: '0.25rem' }}>
                {language === 'en' ? 'Revenue' : 'Ingresos'}
              </div>
              <div style={{ fontSize:  '1.75rem', fontWeight: 'bold', color: '#22c55e' }}>
                ${calc.salesPrice.toLocaleString()}
              </div>
            </div>

            {/* COGS */}
            <div style={{
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              border: '2px solid #ef4444'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#ef4444', marginBottom: '0.25rem' }}>
                COGS
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ef4444' }}>
                -${results.cogs.toLocaleString()}
              </div>
            </div>

            {/* Gross Profit */}
            <div style={{
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px',
              border: '2px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#3b82f6', marginBottom: '0.25rem' }}>
                {language === 'en' ? 'Gross Profit' : 'Beneficio Bruto'} ({results.grossMargin. toFixed(1)}%)
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#3b82f6' }}>
                ${results.grossProfit. toLocaleString()}
              </div>
            </div>

            {/* Operating Expenses */}
            <div style={{
              padding: '1rem',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '8px',
              border: '2px solid #f59e0b'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#f59e0b', marginBottom: '0.25rem' }}>
                {language === 'en' ? 'Operating Expenses' : 'Gastos Operativos'}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f59e0b' }}>
                -${results.opex.toLocaleString()}
              </div>
            </div>

            {/* Financing Costs */}
            {results.totalFinancingCosts > 0 && (
              <div style={{
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '8px',
                border: '2px solid #8b5cf6'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#8b5cf6', marginBottom: '0.25rem' }}>
                  {language === 'en' ? 'Financing Costs' : 'Costos Financiamiento'}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                  -${results.totalFinancingCosts.toFixed(0)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#8b5cf6', marginTop:  '0.5rem' }}>
                  {calc.usePOFinance && `PO: $${results.poFinanceCost.toFixed(0)}`}
                  {calc.usePOFinance && calc.useFactoring && ' + '}
                  {calc.useFactoring && `Factoring: $${results.factoringCost.toFixed(0)}`}
                </div>
              </div>
            )}

            {/* Net Profit */}
            <div style={{
              padding: '1.5rem',
              background: results.netProfit >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              border: `3px solid ${results.netProfit >= 0 ? '#22c55e' : '#ef4444'}`
            }}>
              <div style={{ fontSize: '1rem', color: results.netProfit >= 0 ? '#22c55e' : '#ef4444', marginBottom: '0.5rem' }}>
                {language === 'en' ? 'NET PROFIT' : 'BENEFICIO NETO'} ({results.netMargin. toFixed(1)}%)
              </div>
              <div style={{ fontSize: '2. 5rem', fontWeight: 'bold', color: results.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                ${results.netProfit.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// REPORTS COMPONENT
// ================================================================
export function Reports({ language }) {
  const reports = [
    {
      name: 'Profit & Loss Statement',
      nameEs: 'Estado de Resultados',
      description: 'Complete P&L with all revenue, costs, expenses, and financing',
      descriptionEs: 'P&L completo con todos los ingresos, costos, gastos y financiamiento',
      icon: TrendingUp,
      color: '#22c55e'
    },
    {
      name: 'Balance Sheet',
      nameEs: 'Balance General',
      description: 'Assets, liabilities, and equity snapshot',
      descriptionEs: 'Instantánea de activos, pasivos y patrimonio',
      icon: PieChart,
      color: '#3b82f6'
    },
    {
      name: 'Cash Flow Statement',
      nameEs: 'Estado de Flujo de Efectivo',
      description: 'Cash in vs.  cash out analysis',
      descriptionEs: 'Análisis de entrada vs. salida de efectivo',
      icon: DollarSign,
      color:  '#14b8a6'
    },
    {
      name: 'Margin Analysis',
      nameEs: 'Análisis de Márgenes',
      description: 'Gross margin and net margin by product/customer',
      descriptionEs: 'Margen bruto y neto por producto/cliente',
      icon: BarChart3,
      color: '#f59e0b'
    },
    {
      name: 'Financing Cost Report',
      nameEs: 'Reporte de Costos de Financiamiento',
      description: 'All PO financing and factoring costs breakdown',
      descriptionEs: 'Desglose de todos los costos de financiamiento PO y factoraje',
      icon: Receipt,
      color: '#8b5cf6'
    },
    {
      name: 'Expense Report',
      nameEs: 'Reporte de Gastos',
      description: 'Operating expenses by category',
      descriptionEs:  'Gastos operativos por categoría',
      icon:  Package,
      color: '#ef4444'
    }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
        {language === 'en' ? '📊 Financial Reports' : '📊 Reportes Financieros'}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <div key={index} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: `2px solid ${report.color}20`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${report.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget. style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: `${report.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Icon size={28} color={report.color} />
              </div>
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                {language === 'en' ? report. name : report.nameEs}
              </h3>
              
              <p style={{
                color: '#94a3b8',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {language === 'en' ?  report.description : report.descriptionEs}
              </p>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: report.color,
                  color: 'white',
                  border:  'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <Eye size={16} />
                  {language === 'en' ? 'View' : 'Ver'}
                </button>
                <button style={{
                  padding: '0.75rem',
                  background: `${report.color}20`,
                  color: report.color,
                  border: `2px solid ${report.color}`,
                  borderRadius: '8px',
                  fontWeight:  'bold',
                  cursor: 'pointer'
                }}>
                  <Download size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ================================================================
// CLIENTS TAB
// ================================================================
export function ClientsTab({ language }) {
  const clients = [
    { name: 'Green Valley Farms', totalRevenue: 125000, invoices: 12, avgPaymentDays: 28, status: 'excellent' },
    { name: 'Sunrise Produce Co.', totalRevenue: 98000, invoices: 8, avgPaymentDays: 35, status: 'good' },
    { name: 'Pacific Berry Growers', totalRevenue: 156000, invoices: 15, avgPaymentDays: 25, status: 'excellent' },
    { name: 'California Citrus', totalRevenue: 75000, invoices: 6, avgPaymentDays: 42, status: 'fair' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
        {language === 'en' ?  '👥 Client Management' : '👥 Gestión de Clientes'}
      </h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {clients.map((client, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#fff', fontSize: '1. 3rem', fontWeight: 'bold' }}>
                  {client.name}
                </div>
                <div style={{ color:  '#94a3b8', fontSize: '0.85rem' }}>
                  {client.invoices} {language === 'en' ? 'invoices' : 'facturas'} • {client.avgPaymentDays} {language === 'en' ? 'days avg payment' : 'días pago promedio'}
                </div>
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                background: client.status === 'excellent' ?  '#22c55e40'
                  : client.status === 'good' ? '#3b82f640'
                  : '#f59e0b40',
                color: client.status === 'excellent' ?  '#22c55e'
                  : client.status === 'good' ? '#3b82f6'
                  :  '#f59e0b',
                fontWeight: 'bold',
                fontSize: '0.85rem'
              }}>
                {client.status. toUpperCase()}
              </div>
            </div>
            <div style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold' }}>
              ${client.totalRevenue.toLocaleString()}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              {language === 'en' ? 'Total Revenue' : 'Ingresos Totales'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// CALENDAR TAB
// ================================================================
export function CalendarTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
        {language === 'en' ? '📅 Payment Calendar' : '📅 Calendario de Pagos'}
      </h2>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        border: '2px solid rgba(132, 204, 22, 0.3)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📆</div>
        <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
          {language === 'en'
            ? 'Calendar view showing all invoices, payments, and due dates'
            : 'Vista de calendario mostrando todas las facturas, pagos y fechas de vencimiento'}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// RECEIPTS TAB
// ================================================================
export function ReceiptsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
        {language === 'en' ? '🧾 Receipt Management' : '🧾 Gestión de Recibos'}
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem' }}>
        {language === 'en'
          ? 'Upload receipts for expense tracking and tax documentation.  OCR auto-extraction coming soon!'
          : '¡Sube recibos para seguimiento de gastos y documentación fiscal.  Extracción automática OCR próximamente!'}
      </p>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        border: '2px dashed rgba(168, 85, 247, 0.5)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
        <div style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          {language === 'en' ? 'Upload Receipt' : 'Subir Recibo'}
        </div>
        <div style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          {language === 'en' ? 'Take a photo or upload file' : 'Toma una foto o sube archivo'}
        </div>
        <button style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 6px 20px rgba(168, 85, 247, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Upload size={20} />
          {language === 'en' ? 'Capture Receipt' : 'Capturar Recibo'}
        </button>
      </div>
    </div>
  );
}