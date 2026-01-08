/**
 * RiskModelEngine - Risk assessment and scoring logic for traceability
 */

/**
 * Calculate risk score based on various factors
 * @param {Object} data - Input data for risk calculation
 * @returns {Object} Risk assessment results
 */
export const calculateRiskScore = (data = {}) => {
  const {
    waterTestScore = 0,
    soilTestScore = 0,
    fertilizerCompliance = 0,
    certificationStatus = 'none',
    lastAuditDate = null,
    incidentHistory = []
  } = data;

  let riskScore = 100;
  const riskFactors = [];

  // Water test risk
  if (waterTestScore < 70) {
    riskScore -= 20;
    riskFactors.push('Low water test score');
  }

  // Soil test risk
  if (soilTestScore < 70) {
    riskScore -= 20;
    riskFactors.push('Low soil test score');
  }

  // Fertilizer compliance risk
  if (fertilizerCompliance < 80) {
    riskScore -= 15;
    riskFactors.push('Fertilizer compliance issues');
  }

  // Certification risk
  if (certificationStatus === 'none') {
    riskScore -= 25;
    riskFactors.push('No certification');
  } else if (certificationStatus === 'expired') {
    riskScore -= 15;
    riskFactors.push('Expired certification');
  }

  // Audit recency risk
  if (lastAuditDate) {
    const daysSinceAudit = Math.floor((Date.now() - new Date(lastAuditDate)) / (1000 * 60 * 60 * 24));
    if (daysSinceAudit > 365) {
      riskScore -= 10;
      riskFactors.push('Audit overdue');
    }
  }

  // Incident history risk
  if (incidentHistory.length > 0) {
    riskScore -= Math.min(incidentHistory.length * 5, 20);
    riskFactors.push(`${incidentHistory.length} incident(s) in history`);
  }

  // Ensure score is between 0 and 100
  riskScore = Math.max(0, Math.min(100, riskScore));

  // Determine risk level
  let riskLevel = 'LOW';
  if (riskScore < 60) riskLevel = 'HIGH';
  else if (riskScore < 80) riskLevel = 'MEDIUM';

  return {
    score: riskScore,
    level: riskLevel,
    factors: riskFactors,
    recommendation: getRiskRecommendation(riskLevel)
  };
};

/**
 * Get recommendation based on risk level
 * @param {string} riskLevel - Risk level (LOW, MEDIUM, HIGH)
 * @returns {string} Recommendation text
 */
const getRiskRecommendation = (riskLevel) => {
  const recommendations = {
    LOW: 'Maintain current practices. Continue regular monitoring.',
    MEDIUM: 'Review and address identified risk factors. Schedule follow-up assessment.',
    HIGH: 'Immediate corrective action required. Implement comprehensive improvement plan.'
  };

  return recommendations[riskLevel] || 'Unable to determine recommendation.';
};

/**
 * Analyze traceability chain for gaps
 * @param {Array} chain - Traceability chain data
 * @returns {Object} Chain analysis results
 */
export const analyzeTraceabilityChain = (chain = []) => {
  const gaps = [];
  const completeness = chain.length > 0 ? (chain.filter(item => item.verified).length / chain.length) * 100 : 0;

  chain.forEach((item, index) => {
    if (!item.verified) {
      gaps.push({
        step: index + 1,
        description: item.description || 'Unknown step',
        issue: 'Not verified'
      });
    }
  });

  return {
    completeness: Math.round(completeness),
    gaps,
    chainLength: chain.length,
    verifiedSteps: chain.filter(item => item.verified).length
  };
};

export default {
  calculateRiskScore,
  analyzeTraceabilityChain
};
