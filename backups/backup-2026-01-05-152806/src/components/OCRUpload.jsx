<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import useFileUpload from "../hooks/useFileUpload";

export default function OCRUpload({ onTextExtracted, documentType = "general" }) {
  const { uploading, progress, uploadFile, error } = useFileUpload();
  const [extractedText, setExtractedText] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [language, setLanguage] = useState("en");

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPG, PNG) or PDF');
      return;
    }

    try {
      const result = await uploadFile(file, "/api/ocr/extract-text", { 
        documentType,
        language,
        extractStructuredData: true 
      });

      if (result.ok && result.data) {
        const { text, confidence: conf, structuredData } = result.data;
        setExtractedText(text || "");
        setConfidence(conf);
        
        if (onTextExtracted) {
          onTextExtracted({
            text,
            confidence: conf,
            structuredData,
            file: file
          });
        }
      }
    } catch (err) {
      console.error('OCR processing failed:', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files: [files[0]] } };
      handleFileSelect(event);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText).then(() => {
      alert('Text copied to clipboard!');
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">OCR Text Extraction</h2>
        
        {/* Settings */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General Document</option>
              <option value="invoice">Invoice</option>
              <option value="receipt">Receipt</option>
              <option value="contract">Contract</option>
              <option value="form">Form</option>
              <option value="handwritten">Handwritten</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="auto">Auto-detect</option>
            </select>
          </div>
        </div>

        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-6 ${
            uploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <div className="text-blue-600 font-medium">Processing document with OCR...</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">{progress}% complete</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto h-16 w-16 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <label htmlFor="ocr-upload" className="cursor-pointer">
                  <span className="text-lg font-medium text-gray-900">Upload Document for OCR</span>
                  <p className="text-gray-500 mt-1">Drag and drop or click to select</p>
                  <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, PDF up to 10MB</p>
                </label>
                <input
                  id="ocr-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">OCR Processing Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Text Display */}
        {extractedText && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Extracted Text</h3>
              <div className="flex items-center space-x-4">
                {confidence && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Confidence:</span>
                    <span className={`text-sm font-medium ${
                      confidence > 0.9 ? 'text-green-600' : 
                      confidence > 0.7 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                )}
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Copy Text
                </button>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Extracted text will appear here..."
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {extractedText.length} characters
              </div>
            </div>

            {/* Text Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{extractedText.split(' ').length}</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{extractedText.split('\n').length}</div>
                <div className="text-sm text-gray-600">Lines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{extractedText.length}</div>
                <div className="text-sm text-gray-600">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {extractedText ? Math.round(extractedText.split(' ').length / 200) || 1 : 0}
                </div>
                <div className="text-sm text-gray-600">Est. Minutes to Read</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setExtractedText("")}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Clear Text
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([extractedText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'extracted-text.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Download as TXT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

