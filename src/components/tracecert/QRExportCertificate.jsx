import React, { useState } from 'react';
import { QrCode, Download } from 'lucide-react';

/**
 * QRExportCertificate Component - Generate and export QR codes for certificates
 */
const QRExportCertificate = ({ certificateId = 'CERT-001', growerName = 'Sample Grower' }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    // TODO: Implement actual QR code generation and export
    setTimeout(() => {
      setExporting(false);
      alert('QR Certificate exported successfully!');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <QrCode size={24} />
        QR Export Certificate
      </h3>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <QrCode size={120} className="mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">Certificate ID: {certificateId}</p>
          <p className="text-sm text-gray-600 mb-4">Grower: {growerName}</p>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Download size={20} />
          {exporting ? 'Exporting...' : 'Export QR Certificate'}
        </button>
      </div>
    </div>
  );
};

export default QRExportCertificate;

