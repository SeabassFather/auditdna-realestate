// ================================================================
// APPRAISAL VERIFICATION SERVICE
// Anti-fraud appraisal validation
// ================================================================

class AppraisalVerificationService {
  constructor() {
    this.confidenceLevels = {
      HIGH: 'high',
      MEDIUM: 'medium',
      LOW: 'low',
      FLAGGED: 'flagged'
    };
  }

  // Generate unique Appraisal ID
  generateAppraisalID() {
    const prefix = 'APR';
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${prefix}-${timestamp}-${random}`;
  }

  // Verify appraisal integrity
  async verifyAppraisal(appraisalData) {
    const checks = {
      appraiserVerified: this.checkAppraiserCredentials(appraisalData.appraiserID),
      compsValid: this.validateComps(appraisalData.comps, appraisalData.propertyAddress),
      valuationReasonable: this.checkValuationRange(appraisalData.valuationAmount, appraisalData.comps),
      documentIntact: await this.verifyDocumentIntegrity(appraisalData.documentHash),
      noManipulation: this.detectManipulation(appraisalData)
    };

    const confidenceScore = this.calculateConfidenceScore(checks, appraisalData.comps);

    return {
      appraisalID: this.generateAppraisalID(),
      confidence: confidenceScore.level,
      confidencePercentage: confidenceScore.percentage,
      checks: checks,
      flags: this.generateFlags(checks, appraisalData),
      timestamp: new Date().toISOString(),
      documentHash: this.generateDocumentHash(appraisalData)
    };
  }

  checkAppraiserCredentials(appraiserID) {
    // Real implementation would verify against appraiser registry
    return !!appraiserID && appraiserID.length > 5;
  }

  validateComps(comps, propertyAddress) {
    if (!comps || comps.length < 3) return false;

    return comps.every(comp => {
      const distance = this.calculateDistance(comp.coordinates, propertyAddress.coordinates);
      const ageInDays = this.getSaleDays(comp.saleDate);
      
      return distance < 5 && ageInDays < 180; // Within 5km and 6 months
    });
  }

  calculateDistance(coords1, coords2) {
    // Simplified distance calculation
    const latDiff = Math.abs(coords1.lat - coords2.lat);
    const lngDiff = Math.abs(coords1.lng - coords2.lng);
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Approximate km
  }

  getSaleDays(saleDate) {
    const sale = new Date(saleDate);
    const now = new Date();
    return Math.floor((now - sale) / (1000 * 60 * 60 * 24));
  }

  checkValuationRange(valuation, comps) {
    if (!comps || comps.length === 0) return false;

    const compValues = comps.map(c => c.salePrice);
    const avgCompValue = compValues.reduce((a, b) => a + b, 0) / compValues.length;
    const deviation = Math.abs(valuation - avgCompValue) / avgCompValue;

    return deviation < 0.15; // Within 15% of average
  }

  async verifyDocumentIntegrity(documentHash) {
    // Placeholder for document hash verification
    return !!documentHash;
  }

  detectManipulation(appraisalData) {
    const flags = [];

    // Check for reused appraisals
    if (appraisalData.previousUses > 0) flags.push('REUSED_APPRAISAL');

    // Check for abnormal value jumps
    if (appraisalData.priorValuation) {
      const increase = (appraisalData.valuationAmount - appraisalData.priorValuation) / appraisalData.priorValuation;
      if (increase > 0.30) flags.push('ABNORMAL_VALUE_JUMP');
    }

    // Check for appraiser-agent clustering
    if (appraisalData.appraiserAgentHistory > 5) flags.push('APPRAISER_AGENT_CLUSTERING');

    return flags.length === 0;
  }

  calculateConfidenceScore(checks, comps) {
    let score = 100;

    if (!checks.appraiserVerified) score -= 30;
    if (!checks.compsValid) score -= 25;
    if (!checks.valuationReasonable) score -= 20;
    if (!checks.documentIntact) score -= 15;
    if (!checks.noManipulation) score -= 10;

    // Bonus for quality comps
    if (comps && comps.length >= 5) score += 5;

    let level;
    if (score >= 85) level = this.confidenceLevels.HIGH;
    else if (score >= 65) level = this.confidenceLevels.MEDIUM;
    else if (score >= 50) level = this.confidenceLevels.LOW;
    else level = this.confidenceLevels.FLAGGED;

    return { level, percentage: score };
  }

  generateFlags(checks, appraisalData) {
    const flags = [];

    if (!checks.appraiserVerified) flags.push({ severity: 'HIGH', message: 'Unverified appraiser' });
    if (!checks.compsValid) flags.push({ severity: 'MEDIUM', message: 'Invalid comparable properties' });
    if (!checks.valuationReasonable) flags.push({ severity: 'HIGH', message: 'Valuation outside acceptable range' });
    if (!checks.documentIntact) flags.push({ severity: 'CRITICAL', message: 'Document integrity compromised' });
    if (!checks.noManipulation) flags.push({ severity: 'CRITICAL', message: 'Manipulation detected' });

    return flags;
  }

  generateDocumentHash(appraisalData) {
    // Simplified hash generation
    const data = JSON.stringify(appraisalData);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `SHA256:${Math.abs(hash).toString(16)}`;
  }
}

export default new AppraisalVerificationService();
