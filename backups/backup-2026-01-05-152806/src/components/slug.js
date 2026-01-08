<<<<<<< HEAD
export const slugify = (s) =>
=======
﻿export const slugify = (s) =>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
