import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';

/**
 * FertilizerUpload Component - Upload and manage fertilizer application records
 */
const FertilizerUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    // TODO: Implement actual upload logic
    setTimeout(() => {
      setUploading(false);
      alert('Fertilizer records uploaded successfully!');
      setFile(null);
    }, 1500);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Fertilizer Application Upload</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png,.xlsx,.csv"
          className="mb-4"
        />
        {file && (
          <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span>{file.name}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? 'Uploading...' : 'Upload Fertilizer Records'}
      </button>
    </div>
  );
};

export default FertilizerUpload;

