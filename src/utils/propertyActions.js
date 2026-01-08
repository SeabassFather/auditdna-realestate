import jsPDF from 'jspdf';

export const emailProperty = (property) => {
  const subject = encodeURIComponent(`Property: ${property.title}`);
  const body = encodeURIComponent(`Interested in ${property.title} at $${property.price.toLocaleString()}`);
  window.location.href = `mailto:estates@auditdna.com?subject=${subject}&body=${body}`;
};

export const printProperty = (property) => {
  const w = window.open('');
  w.document.write(`<html><body><h1>${property.title}</h1><h2>$${property.price.toLocaleString()}</h2><p>${property.city}, ${property.region}</p></body></html>`);
  w.print();
};

export const downloadPDF = (property) => {
  const pdf = new jsPDF();
  pdf.setFontSize(24);
  pdf.text(property.title, 20, 30);
  pdf.setFontSize(20);
  pdf.text(`$${property.price.toLocaleString()}`, 20, 45);
  pdf.save(`${property.title.replace(/\s/g, '_')}.pdf`);
};