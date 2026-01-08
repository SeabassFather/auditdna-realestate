<<<<<<< HEAD
export function newCaseId() {
=======
﻿export function newCaseId() {
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return (
    "case_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
