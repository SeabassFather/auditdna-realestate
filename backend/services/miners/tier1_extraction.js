// ══════════════════════════════════════════════════════════════════════════════
//  TIER 1 — DOCUMENT EXTRACTION (SI)
//  Path: C:\AuditDNA\auditdna-realestate\backend\services\miners\tier1_extraction.js
//  Classifies and extracts structure from uploaded mortgage documents
// ══════════════════════════════════════════════════════════════════════════════
'use strict';

const extractAllDocuments = async (documents) => {
  console.log('   [Tier 1] Document Extraction...');

  const docs = Array.isArray(documents) ? documents : [];

  // Detect document types from filenames or strings passed in
  const hasCD  = docs.some(d => /closing.?disc|cd\b/i.test(JSON.stringify(d)));
  const hasLE  = docs.some(d => /loan.?est|le\b/i.test(JSON.stringify(d)));
  const hasHUD = docs.some(d => /hud|settlement/i.test(JSON.stringify(d)));
  const hasPMI = docs.some(d => /pmi|mortgage.?ins/i.test(JSON.stringify(d)));
  const hasNote= docs.some(d => /note|promissory/i.test(JSON.stringify(d)));
  const hasTitle=docs.some(d => /title|policy/i.test(JSON.stringify(d)));

  // If doc strings passed directly (e.g. "closingDisclosure")
  const docStr = docs.join(' ').toLowerCase();

  const extracted = {
    raw:               docs,
    documentCount:     docs.length,
    closingDisclosure: hasCD  || docStr.includes('closingdisclosure') || docStr.includes('closing_disclosure'),
    loanEstimate:      hasLE  || docStr.includes('loanestimate')      || docStr.includes('loan_estimate'),
    hud1:              hasHUD || docStr.includes('hud'),
    pmiDocs:           hasPMI || docStr.includes('pmi') ? [{ found: true }] : [],
    titlePolicy:       hasTitle|| docStr.includes('title'),
    promissoryNote:    hasNote || docStr.includes('note'),
    statements:        docs.length > 0 ? [{ months: docs.length * 3 }] : [],
    escrowAnalysis:    hasCD || hasHUD ? { found: true } : null,
    detectedTypes:     [],
    extractionDate:    new Date().toISOString()
  };

  // Build detected types list
  if (extracted.closingDisclosure) extracted.detectedTypes.push('Closing Disclosure (CD)');
  if (extracted.loanEstimate)      extracted.detectedTypes.push('Loan Estimate (LE)');
  if (extracted.hud1)              extracted.detectedTypes.push('HUD-1 Settlement Statement');
  if (extracted.pmiDocs.length)    extracted.detectedTypes.push('PMI Documentation');
  if (extracted.titlePolicy)       extracted.detectedTypes.push('Title Insurance Policy');
  if (extracted.promissoryNote)    extracted.detectedTypes.push('Promissory Note');

  console.log(`   [Tier 1] Extracted ${docs.length} docs | Types: ${extracted.detectedTypes.join(', ') || 'General Analysis'}`);
  return extracted;
};

module.exports = { extractAllDocuments };
