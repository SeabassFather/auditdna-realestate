<<<<<<< HEAD
// Service layer for Mortgage Loan Audit API calls
=======
﻿// Service layer for Mortgage Loan Audit API calls
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
// Expand with real endpoints and business logic

import api from "../utils/api";

/**
 * Submit mortgage loan audit data and uploaded docs.
 * @param {object} formData - Data for the audit (can include files via FormData)
 * @returns {Promise<object>} API response
 */
export async function submitMortgageLoanAudit(formData) {
  // Example: replace '/audit/mortgage' with your backend route
  return api.post("/audit/mortgage", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(r => r.data);
}

/**
 * Optionally: fetch audit requirements/checklist from backend
 */
export async function getMortgageAuditChecklist() {
  // Example: replace with real endpoint as needed
  return api.get("/audit/mortgage/checklist").then(r => r.data);
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
