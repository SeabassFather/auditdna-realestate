// ================================================================
// LIVE PRODUCT CARD - Customer Portal
// ================================================================
// Date: 2025-11-18 04:28:48 UTC
// Author: SeabassFather
// Purpose: Individual product card with live pricing & add to cart
// ================================================================

import React, { useState } from 'react';
import { ShoppingCart, Package, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const LiveProductCard = ({ product, onAddToCart, language = 'en' }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(product.units[0]); // Default to first available unit
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedQuantity: quantity,
      selectedUnit: unit,
      totalPrice: calculatePrice()
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    // Reset quantity
    setQuantity(1);
  };

  const calculatePrice = () => {
    let basePrice = product.pricePerUnit;
    
    // Volume discounts
    if (quantity >= 100) basePrice *= 0.90; // 10% off for 100+
    if (quantity >= 500) basePrice *= 0.85; // 15% off for 500+
    if (quantity >= 1000) basePrice *= 0.80; // 20% off for 1000+
    
    return (basePrice * quantity).toFixed(2);
  };

  const getDiscountBadge = () => {
    if (quantity >= 1000) return { text: '20% OFF', color: '#dc2626' };
    if (quantity >= 500) return { text: '15% OFF', color: '#ea580c' };
    if (quantity >= 100) return { text: '10% OFF', color: '#f59e0b' };
    return null;
  };

  const isAvailable = product.availableQuantity > 0;
  const isLowStock = product.availableQuantity < 50 && product.availableQuantity > 0;
  const discount = getDiscountBadge();

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '16px',
      border: `2px solid ${isAvailable ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Success Animation */}
      {showSuccess && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(34, 197, 94, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          animation: 'fadeInOut 2s ease'
        }}>
          <div style={{ textAlign: 'center' }}>
            <CheckCircle size={48} style={{ color: '#fff', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
              {language === 'en' ? 'Added to Cart!' : ' al Carrito!'}
            </div>
          </div>
        </div>
      )}

      {/* Discount Badge */}
      {discount && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: discount.color,
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          animation: 'pulse 2s infinite'
        }}>
          {discount.text}
        </div>
      )}

      {/* Product Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem'
        }}>
          {product.emoji || '
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '0.5rem'
          }}>
            {product.name}
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Package size={16} style={{ color: '#94a3b8' }} />
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              {product.origin}  {product.grade}
            </span>
          </div>

          {/* Availability Status */}
          {isAvailable ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} style={{ color: '#22c55e' }} />
              <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: '600' }}>
                {product.availableQuantity} {product.units[0]} {language === 'en' ? 'Available' : 'Disponible'}
              </span>
              {isLowStock && (
                <span style={{
                  background: 'rgba(234, 179, 8, 0.2)',
                  color: '#facc15',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {language === 'en' ? 'LOW STOCK' : 'POCO STOCK'}
                </span>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} style={{ color: '#ef4444' }} />
              <span style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '600' }}>
                {language === 'en' ? 'Out of Stock' : 'Agotado'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Price Section */}
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1rem',
        border: '1px solid rgba(34, 197, 94, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            {language === 'en' ? 'Unit Price' : 'Precio Unitario'}
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#22c55e' }}>
            ${product.pricePerUnit.toFixed(2)} / {unit}
          </span>
        </div>

        {quantity > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              {language === 'en' ? 'Total' : 'Total'} ({quantity} {unit})
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
              ${calculatePrice()}
            </span>
          </div>
        )}

        {/* Price Trend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          {product.priceTrend === 'up' ? (
            <>
              <TrendingUp size={14} style={{ color: '#ef4444' }} />
              <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>
                +{product.priceChange}% {language === 'en' ? 'vs last week' : 'vs semana pasada'}
              </span>
            </>
          ) : (
            <>
              <TrendingDown size={14} style={{ color: '#22c55e' }} />
              <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>
                {product.priceChange}% {language === 'en' ? 'vs last week' : 'vs semana pasada'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Quantity & Unit Selection */}
      {isAvailable && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Quantity Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                {language === 'en' ? 'Quantity' : 'Cantidad'}
              </label>
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.availableQuantity))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              />
            </div>

            {/* Unit Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                {language === 'en' ? 'Unit' : 'Unidad'}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {product.units.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Volume Discount Info */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#c4b5fd', marginBottom: '0.5rem', fontWeight: '600' }}>
              {language === 'en' ? 'Volume Discounts:' : 'Descuentos por Volumen:'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#a78bfa', lineHeight: '1.6' }}>
               100+ {unit}: 10% off<br/>
               500+ {unit}: 15% off<br/>
               1000+ {unit}: 20% off
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.4)';
            }}
          >
            <ShoppingCart size={20} />
            {language === 'en' ? 'Add to Cart' : 'Agregar al Carrito'}
          </button>
        </>
      )}

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default LiveProductCard;
