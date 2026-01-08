<<<<<<< HEAD
const downloadPdf = () => {
  const doc = generateIntakePdf(rec.service, rec.id, rec.data);
  doc.save(rec.service.replace(/\s+/g, "_") + "__Intake.pdf");
};
=======
ï»¿const downloadPdf = () => {
  const doc = generateIntakePdf(rec.service, rec.id, rec.data);
  doc.save(rec.service.replace(/\s+/g, "_") + "__Intake.pdf");
};

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

