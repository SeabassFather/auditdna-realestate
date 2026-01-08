<<<<<<< HEAD
// src/components/ServiceDrawer.jsx
=======
ï»¿// src/components/ServiceDrawer.jsx
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import React, { useState } from "react";
import { X, FileText, AlertCircle, Building2, DollarSign, Clock, Shield, Upload, CheckCircle, Phone, Calendar, ChevronRight } from "lucide-react";

export default function ServiceDrawer({ open, onClose, service, category, details = {} }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", company: "", address: "", city: "", state: "", zip: "",
    caseDescription: "", referralCode: "", referrerName: "", serviceType: service || "",
    urgency: "standard", budget: "", preferredDate: "", additionalInfo: "",
    lastFourSSN: "", dateOfBirth: "", propertyAddress: "", loanNumber: "", termsAccepted: false
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    console.log('Service Request:', formData);
    console.log('Files:', files);
    
    // TODO: Replace with actual API call
    // await fetch('/api/submit-audit-inquiry', { method: 'POST', body: JSON.stringify(formData) });
    
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setStep(1);
        setSuccess(false);
        setFiles([]);
        setFormData({
          fullName: "", email: "", phone: "", company: "", address: "", city: "", state: "", zip: "",
          caseDescription: "", referralCode: "", referrerName: "", serviceType: service || "",
          urgency: "standard", budget: "", preferredDate: "", additionalInfo: "",
          lastFourSSN: "", dateOfBirth: "", propertyAddress: "", loanNumber: "", termsAccepted: false
        });
      }, 2500);
    }, 1500);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div 
        className="bg-white h-full w-full max-w-2xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-sm opacity-90 mb-1">{category}</div>
              <h2 className="text-2xl font-bold">{service}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-4">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                  step >= num ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  {num}
                </div>
                {num < 3 && <div className={`flex-1 h-1 mx-2 ${step > num ? 'bg-white' : 'bg-blue-500'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs opacity-90">
            <span>Contact Info</span>
            <span>Documents</span>
            <span>Review</span>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Request Submitted!</h3>
              <p className="text-gray-600 mb-4">Our team will review and contact you within 24-48 hours.</p>
              <p className="text-sm text-gray-500 font-mono">Reference: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-6">
                  {details.description && (
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                          <p className="font-semibold mb-1">Service Details</p>
                          <p className="mb-2">{details.description}</p>
                          {details.estimatedRefund && <p><strong>Est. Refund:</strong> {details.estimatedRefund}</p>}
                          {details.timeline && <p><strong>Timeline:</strong> {details.timeline}</p>}
                          {details.pricing && <p><strong>Pricing:</strong> {details.pricing}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Organization</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Acme Corporation"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="City"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="CA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => handleInputChange('zip', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Verification */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Identity Verification</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      For refund verification and title company coordination:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last 4 of SSN <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength="4"
                          pattern="[0-9]{4}"
                          value={formData.lastFourSSN}
                          onChange={(e) => handleInputChange('lastFourSSN', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          placeholder="1234"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Address</label>
                        <input
                          type="text"
                          value={formData.propertyAddress}
                          onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          placeholder="123 Main St, City, ST"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Number</label>
                        <input
                          type="text"
                          value={formData.loanNumber}
                          onChange={(e) => handleInputChange('loanNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          placeholder="Enter loan number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Service Requirements</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency</label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => handleInputChange('urgency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                        >
                          <option value="standard">Standard (2-4 weeks)</option>
                          <option value="expedited">Expedited (1-2 weeks)</option>
                          <option value="rush">Rush (3-5 days)</option>
                          <option value="emergency">Emergency (24-48 hours)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          >
                            <option value="">Select range</option>
                            <option value="under-5k">Under $5,000</option>
                            <option value="5k-10k">$5,000 - $10,000</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k-plus">$50,000+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referral */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Referral Code (Optional)</label>
                    <input
                      type="text"
                      value={formData.referralCode}
                      onChange={(e) => handleInputChange('referralCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter referral code"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Documents */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Upload Documents</h3>
                  
                  {details.requiredDocs && details.requiredDocs.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                      <p className="font-semibold text-yellow-900 mb-2">Required Documents:</p>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {details.requiredDocs.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2">
<<<<<<< HEAD
                            <span className="text-yellow-600 mt-0.5">
                            <span className="text-yellow-600 mt-0.5">
=======
                            <span className="text-yellow-600 mt-0.5">
                            <span className="text-yellow-600 mt-0.5">
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFiles(Array.from(e.target.files))}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-blue-600 font-semibold text-lg hover:text-blue-700">Click to upload</span>
                      <span className="text-gray-600"> or drag and drop</span>
                      <p className="text-sm text-gray-500 mt-2">PDF, DOC, XLS, Images (Max 10MB per file)</p>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">Uploaded Files ({files.length}):</p>
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate flex-1">{f.name}</span>
                          <span className="text-xs text-gray-500">{(f.size / 1024).toFixed(1)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Case Description</label>
                    <textarea
                      rows="5"
                      value={formData.caseDescription}
                      onChange={(e) => handleInputChange('caseDescription', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      placeholder="Describe your situation, specific concerns, or questions..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Review & Submit</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-semibold text-gray-900">{service}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold text-gray-900">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-900">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Urgency</p>
                        <p className="font-semibold text-gray-900 capitalize">{formData.urgency}</p>
                      </div>
                    </div>
                    {files.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Documents Uploaded</p>
                        <p className="font-semibold text-gray-900">{files.length} file(s)</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        I authorize AuditDNA to review my documents, contact regulatory agencies on my behalf, 
                        and coordinate with title companies for refund processing. All communications are confidential.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={uploading || !formData.termsAccepted}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {uploading ? 'Submitting...' : 'Submit Request'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div
<<<<<<< HEAD
    </div>
=======
    </div>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

