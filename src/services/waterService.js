<<<<<<< HEAD
const logger = require('../config/logger');

// Calculate TDS from conductivity
exports.calculateTDS = (conductivity, temperature = 25) => {
  // TDS (ppm) = Conductivity (Î¼S/cm)  0.5 to 0.7 (conversion factor)
  // Temperature correction: conductivity increases ~2% per 
  // TDS (ppm) = Conductivity (  0.5 to 0.7 (conversion factor)
  // Temperature correction: conductivity increases ~2% per 
=======
﻿const logger = require('../config/logger');

// Calculate TDS from conductivity
exports.calculateTDS = (conductivity, temperature = 25) => {
  // TDS (ppm) = Conductivity (  0.5 to 0.7 (conversion factor)
  // Temperature correction: conductivity increases ~2% per 
  // TDS (ppm) = Conductivity (  0.5 to 0.7 (conversion factor)
  // Temperature correction: conductivity increases ~2% per 
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  const tempCorrectionFactor = 1 + ((temperature - 25) * 0.02);
  const correctedConductivity = conductivity / tempCorrectionFactor;
  
  return Math.round(correctedConductivity * 0.64);
};

// Classify TDS levels
exports.classifyTDS = (tds) => {
  if (tds < 50) return 'Very soft';
  if (tds < 150) return 'Soft';
  if (tds < 300) return 'Slightly hard';
  if (tds < 600) return 'Moderately hard';
  if (tds < 1000) return 'Hard';
  return 'Very hard';
};

// Calculate hardness from calcium and magnesium
exports.calculateHardness = (calcium, magnesium) => {
<<<<<<< HEAD
  // Hardness (mg/L as CaCO3) = 2.5  Ca + 4.1  Mg
  // Hardness (mg/L as CaCO3) = 2.5  Ca + 4.1  Mg
=======
  // Hardness (mg/L as CaCO3) = 2.5  Ca + 4.1  Mg
  // Hardness (mg/L as CaCO3) = 2.5  Ca + 4.1  Mg
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  return Math.round((2.5 * calcium) + (4.1 * magnesium));
};

// Classify hardness
exports.classifyHardness = (hardness) => {
  if (hardness < 60) return 'soft';
  if (hardness < 120) return 'moderate';
  if (hardness < 180) return 'hard';
  return 'very_hard';
};

// Calculate Langelier Saturation Index (LSI)
exports.calculateLSI = (pH, temperature, tds, calcium, alkalinity) => {
  // LSI = pH - pHs
  // pHs = (9.3 + A + B) - (C + D)
  // A = (log10[TDS] - 1) / 10
<<<<<<< HEAD
  // B = -13.12  log10( + 273) + 34.55
  // B = -13.12  log10( + 273) + 34.55
=======
  // B = -13.12  log10( + 273) + 34.55
  // B = -13.12  log10( + 273) + 34.55
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  // C = log10[Ca as CaCO3] - 0.4
  // D = log10[alkalinity as CaCO3]

  const A = (Math.log10(tds) - 1) / 10;
  const B = -13.12 * Math.log10(temperature + 273) + 34.55;
  const C = Math.log10(calcium) - 0.4;
  const D = Math.log10(alkalinity);

  const pHs = (9.3 + A + B) - (C + D);
  const lsi = pH - pHs;

  return parseFloat(lsi.toFixed(2));
};

// Interpret LSI
exports.interpretLSI = (lsi) => {
  if (lsi < -2.0) return { level: 'severe', risk: 'Very corrosive' };
  if (lsi < -0.5) return { level: 'moderate', risk: 'Corrosive' };
  if (lsi < 0.5) return { level: 'low', risk: 'Balanced' };
  if (lsi < 2.0) return { level: 'moderate', risk: 'Scale forming' };
  return { level: 'severe', risk: 'Severely scale forming' };
};

// Get LSI recommendations
exports.getLSIRecommendation = (lsi) => {
  if (lsi < -0.5) {
    return [
      'Install corrosion inhibitors',
      'Consider pH adjustment to neutral range',
      'Use corrosion-resistant piping materials',
      'Regular monitoring recommended'
    ];
  } else if (lsi > 0.5) {
    return [
      'Install scale prevention system',
      'Consider water softening',
      'Regular descaling maintenance required',
      'Monitor equipment for scale buildup'
    ];
  }
  return ['Water chemistry is balanced', 'Maintain current treatment program'];
};

// Calculate Ryznar Stability Index (RSI)
exports.calculateRSI = (pH, pHs) => {
  // RSI = 2(pHs) - pH
  const rsi = 2 * pHs - pH;
  return parseFloat(rsi.toFixed(2));
};

// Comprehensive water quality analysis
exports.comprehensiveAnalysis = (waterData) => {
  const analysis = {
    overallQuality: 'good',
    potable: true,
    issues: [],
    recommendations: []
  };

  // Check pH
  if (waterData.pH < 6.5 || waterData.pH > 8.5) {
    analysis.issues.push({
      parameter: 'pH',
      value: waterData.pH,
      issue: waterData.pH < 6.5 ? 'Too acidic' : 'Too alkaline',
      severity: 'moderate'
    });
    analysis.overallQuality = 'fair';
  }

  // Check TDS
  if (waterData.tds > 500) {
    analysis.issues.push({
      parameter: 'TDS',
      value: waterData.tds,
      issue: 'High dissolved solids',
      severity: waterData.tds > 1000 ? 'high' : 'moderate'
    });
    if (waterData.tds > 1000) {
      analysis.potable = false;
      analysis.overallQuality = 'poor';
    }
  }

  // Check hardness
  const hardness = exports.calculateHardness(
    waterData.calcium || 0,
    waterData.magnesium || 0
  );
  
  if (hardness > 180) {
    analysis.issues.push({
      parameter: 'Hardness',
      value: hardness,
      issue: 'Very hard water',
      severity: 'moderate'
    });
    analysis.recommendations.push('Consider water softener installation');
  }

  // Check nitrate
  if (waterData.nitrate && waterData.nitrate > 10) {
    analysis.issues.push({
      parameter: 'Nitrate',
      value: waterData.nitrate,
      issue: 'Exceeds safe drinking water limit',
      severity: 'high'
    });
    analysis.potable = false;
    analysis.overallQuality = 'unacceptable';
    analysis.recommendations.push('Do not use for infant formula');
  }

  // Check lead
  if (waterData.lead && waterData.lead > 15) {
    analysis.issues.push({
      parameter: 'Lead',
      value: waterData.lead,
      issue: 'Exceeds EPA action level',
      severity: 'high'
    });
    analysis.potable = false;
    analysis.overallQuality = 'unacceptable';
    analysis.recommendations.push('Use certified lead filter or alternative water source');
  }

  // Check bacteria
  if (waterData.totalColiform || waterData.eColi) {
    analysis.issues.push({
      parameter: 'Bacteria',
      issue: 'Bacterial contamination detected',
      severity: 'high'
    });
    analysis.potable = false;
    analysis.overallQuality = 'unacceptable';
    analysis.recommendations.push('Water requires disinfection - do not drink');
  }

  // Check chlorine
  if (waterData.freeChlorine) {
    if (waterData.freeChlorine < 0.2) {
      analysis.recommendations.push('Low chlorine residual - monitor for bacteria');
    } else if (waterData.freeChlorine > 4.0) {
      analysis.issues.push({
        parameter: 'Chlorine',
        value: waterData.freeChlorine,
        issue: 'High chlorine levels',
        severity: 'moderate'
      });
      analysis.recommendations.push('Consider carbon filtration for taste/odor');
    }
  }

  // Scale formation risk
  if (waterData.pH && waterData.tds && waterData.calcium && waterData.alkalinity) {
    const lsi = exports.calculateLSI(
      waterData.pH,
      waterData.temperature || 25,
      waterData.tds,
      waterData.calcium,
      waterData.alkalinity
    );

    const lsiInterpretation = exports.interpretLSI(lsi);
    
    if (lsi < -0.5 || lsi > 0.5) {
      analysis.issues.push({
        parameter: 'LSI',
        value: lsi,
        issue: lsiInterpretation.risk,
        severity: lsiInterpretation.level
      });
      analysis.recommendations.push(...exports.getLSIRecommendation(lsi));
    }
  }

  return analysis;
};

// Generate treatment recommendations
exports.generateRecommendations = (waterTest) => {
  const recommendations = [];

  // pH adjustment
  if (waterTest.chemistry.pH && waterTest.chemistry.pH.value < 6.5) {
    recommendations.push({
      issue: 'Low pH (acidic water)',
      solution: 'Install pH neutralizer or calcite filter',
      priority: 'high'
    });
  } else if (waterTest.chemistry.pH && waterTest.chemistry.pH.value > 8.5) {
    recommendations.push({
      issue: 'High pH (alkaline water)',
      solution: 'Install acid feed system',
      priority: 'medium'
    });
  }

  // Hardness
  if (waterTest.chemistry.hardness && waterTest.chemistry.hardness.value > 180) {
    recommendations.push({
      issue: 'Hard water',
      solution: 'Install water softener system',
      priority: 'medium',
      benefits: ['Reduced scale buildup', 'Lower soap usage', 'Extended appliance life']
    });
  }

  // Iron/Manganese
  if (waterTest.minerals.iron && waterTest.minerals.iron.value > 0.3) {
    recommendations.push({
      issue: 'High iron content',
      solution: 'Install iron filter or oxidation system',
      priority: 'medium'
    });
  }

  // Bacteria
  if (waterTest.contaminants.bacteria && 
      (waterTest.contaminants.bacteria.totalColiform.present || 
       waterTest.contaminants.bacteria.eCoil.present)) {
    recommendations.push({
      issue: 'Bacterial contamination',
      solution: 'Install UV disinfection system or chlorination',
      priority: 'critical',
      urgency: 'immediate',
      notes: 'Do not consume water until treated and retested'
    });
  }

  // Lead
  if (waterTest.contaminants.lead && waterTest.contaminants.lead.value > 15) {
    recommendations.push({
      issue: 'Lead contamination',
      solution: 'Install certified lead removal filter',
      priority: 'critical',
      urgency: 'immediate',
      notes: 'Use bottled water until lead filter installed'
    });
  }

  // Arsenic
  if (waterTest.contaminants.arsenic && waterTest.contaminants.arsenic.value > 10) {
    recommendations.push({
      issue: 'Arsenic contamination',
      solution: 'Install reverse osmosis system or certified arsenic filter',
      priority: 'critical'
    });
  }

  // Scale formation
  if (waterTest.analysis.scaleFormation && waterTest.analysis.scaleFormation.risk === 'high') {
    recommendations.push({
      issue: 'High scale formation risk',
      solution: 'Install scale inhibitor or anti-scale system',
      priority: 'medium'
    });
  }

  // High TDS
  if (waterTest.chemistry.tds && waterTest.chemistry.tds.value > 500) {
    recommendations.push({
      issue: 'High total dissolved solids',
      solution: 'Install reverse osmosis system for drinking water',
      priority: waterTest.chemistry.tds.value > 1000 ? 'high' : 'medium'
    });
  }

  return recommendations;
};

<<<<<<< HEAD
module.exports = exports;
=======
module.exports = exports;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
