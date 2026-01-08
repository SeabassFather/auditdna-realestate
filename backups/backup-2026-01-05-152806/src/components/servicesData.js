<<<<<<< HEAD
function ensureAtLeast275(categories) {
=======
﻿function ensureAtLeast275(categories) {
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  const MIN = 275;
  const count = categories.reduce((n, c) => n + c.items.length, 0);
  if (count >= MIN) return categories;

  const need = MIN - count;
  let i = 1;
  const round = categories;
  while (i <= need) {
    const c = round[(i - 1) % round.length];
    c.items.push(`Reserved Slot ${String(i).padStart(3, "0")} (Coming Soon)`);
    i++;
  }
  return categories;
}

export const SERVICE_CATEGORIES = ensureAtLeast275(
  SERVICE_CATEGORIES_BASE.map((c) => ({ ...c, items: [...c.items] })),
);
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
