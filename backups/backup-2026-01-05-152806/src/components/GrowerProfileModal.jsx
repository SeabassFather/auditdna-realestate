import React, { useState } from 'react';
import { 
  X, Phone, Mail, MessageCircle, MapPin, Star, Award, FileText, 
  Download, ExternalLink, Calendar, Users, TrendingUp, AlertCircle,
  CheckCircle, Globe, Truck, Shield, Leaf, Building2
} from 'lucide-react';
import { certificationTypes, foodSafetyBadges } from '../data/cropsTaxonomy';
import { assessGrowerRisk, predictShipping } from '../utils/aiMatchmaking';

export default function GrowerProfileModal({ grower, onClose, onInitiateDeal }) {
  const [activeTab, setActiveTab] = useState('overview');
  const riskAssessment = assessGrowerRisk(grower);
  const yearsInBusiness = new Date().getFullYear() - grower.established;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'risk', label: 'Risk Assessment', icon: Shield }
  ];

  const handleContact = (type) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${grower.contact.phone}`);
        break;
      case 'email':
        window.open(`mailto:${grower.contact.email}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${grower.contact.whatsapp.replace(/[^0-9]/g, '')}`);
        break;
      case 'crm':
        alert('Exporting to CRM...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-6 rounded-t-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">{grower.companyName}</h2>
                {grower.organic && (
                  <span className="bg-white text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Leaf size={16} />
                    Organic Certified
                  </span>
                )}
              </div>
              <p className="text-green-100 text-lg">{grower.dba}</p>
              <div className="flex items-center gap-4 mt-3 text-green-100">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {grower.location.city}, {grower.location.region}, {grower.location.country}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Est. {grower.established} ({yearsInBusiness} years)
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {grower.employees} employees
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Star className="text-yellow-300" size={20} />
                <span className="text-2xl font-bold">{grower.rating}</span>
              </div>
              <div className="text-sm text-green-100">{grower.reviewCount} reviews</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">{grower.riskScore}</div>
              <div className="text-sm text-green-100">Risk Score</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">{grower.deals}</div>
              <div className="text-sm text-green-100">Completed Deals</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-2xl font-bold">{grower.onTimeDelivery}%</div>
              <div className="text-sm text-green-100">On-Time Delivery</div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => handleContact('phone')}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition font-medium"
            >
              <Phone size={18} />
              Call
            </button>
            <button
              onClick={() => handleContact('email')}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition font-medium"
            >
              <Mail size={18} />
              Email
            </button>
            <button
              onClick={() => handleContact('whatsapp')}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition font-medium"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>
            <button
              onClick={() => handleContact('crm')}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition font-medium"
            >
              <ExternalLink size={18} />
              Push to CRM
            </button>
            <button
              onClick={onInitiateDeal}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-bold"
            >
              <MessageCircle size={18} />
              Initiate Deal
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex px-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600 font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab grower={grower} />
          )}
          {activeTab === 'certifications' && (
            <CertificationsTab grower={grower} />
          )}
          {activeTab === 'documents' && (
            <DocumentsTab grower={grower} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab grower={grower} />
          )}
          {activeTab === 'risk' && (
            <RiskAssessmentTab grower={grower} riskAssessment={riskAssessment} />
          )}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ grower }) {
  return (
    <div className="space-y-6">
      {/* Company Bio */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
        <p className="text-gray-700">{grower.bio}</p>
      </div>

      {/* Commodities */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Commodities</h3>
        <div className="flex flex-wrap gap-2">
          {grower.commodities.map((commodity, i) => (
            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              {commodity}
            </span>
          ))}
        </div>
      </div>

      {/* Volume & Capacity */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Production Capacity</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Weekly Volume</div>
            <div className="text-xl font-bold text-gray-900">{grower.volume.weekly}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Annual Volume</div>
            <div className="text-xl font-bold text-gray-900">{grower.volume.annual}</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Contact Person:</span>
            <span className="font-medium">{grower.contact.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{grower.contact.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{grower.contact.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">WhatsApp:</span>
            <span className="font-medium">{grower.contact.whatsapp}</span>
          </div>
        </div>
      </div>

      {/* CRM Integration */}
      {grower.crm && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">CRM Integration</h3>
          <div className="flex gap-3">
            {grower.crm.salesforce && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex-1">
                <div className="text-sm text-blue-600 font-medium">Salesforce</div>
                <div className="text-xs text-gray-600">{grower.crm.salesforce}</div>
              </div>
            )}
            {grower.crm.hubspot && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex-1">
                <div className="text-sm text-orange-600 font-medium">HubSpot</div>
                <div className="text-xs text-gray-600">{grower.crm.hubspot}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CertificationsTab({ grower }) {
  return (
    <div className="space-y-6">
      {/* Main Certifications */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Certifications & Standards</h3>
        <div className="grid grid-cols-2 gap-3">
          {grower.certifications.map((cert, i) => {
            const certInfo = certificationTypes.find(c => c.value === cert);
            return (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{certInfo?.icon || '
                  <span className="text-3xl">{certInfo?.icon || '
                  <div>
                    <div className="font-bold text-gray-900">{certInfo?.label || cert}</div>
                    <div className="text-xs text-green-600">Active & Current</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Food Safety Badges */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Food Safety & Compliance Badges</h3>
        <div className="grid grid-cols-2 gap-3">
          {grower.foodSafetyBadges.map((badge, i) => {
            const badgeInfo = foodSafetyBadges.find(b => b.type === badge);
            return (
              <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">{badgeInfo?.icon || '
                <span className="text-2xl">{badgeInfo?.icon || '
                <div className="text-sm font-medium text-gray-900">{badgeInfo?.label || badge}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="text-green-600" size={24} />
          <h4 className="font-bold text-gray-900">Compliance Status: Excellent</h4>
        </div>
        <p className="text-sm text-gray-700">
          All certifications are current and up-to-date. No compliance issues or violations on record.
        </p>
      </div>
    </div>
  );
}

function DocumentsTab({ grower }) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="text-blue-600" size={20} />
          <h4 className="font-bold text-gray-900">Certificate Vault</h4>
        </div>
        <p className="text-sm text-gray-700">
          Secure document repository with all certifications, audit reports, and compliance documentation.
        </p>
      </div>

      {grower.documents.map((doc, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-lg p-2">
                <FileText className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">{doc}</div>
                <div className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-green-600 hover:text-green-700 p-2">
                <Download size={18} />
              </button>
              <button className="text-blue-600 hover:text-blue-700 p-2">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <Globe className="mx-auto text-gray-400 mb-2" size={32} />
        <p className="text-sm text-gray-600">
          Additional documents available upon request via secure portal
        </p>
      </div>
    </div>
  );
}

function AnalyticsTab({ grower }) {
  const monthlyDeals = Math.round(grower.deals / ((new Date().getFullYear() - grower.established) * 12));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-sm text-blue-600 mb-1">Total Deals</div>
          <div className="text-3xl font-bold text-blue-900">{grower.deals}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-sm text-green-600 mb-1">Monthly Avg</div>
          <div className="text-3xl font-bold text-green-900">{monthlyDeals}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="text-sm text-purple-600 mb-1">Success Rate</div>
          <div className="text-3xl font-bold text-purple-900">{grower.onTimeDelivery}%</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Metrics</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">On-Time Delivery</span>
              <span className="text-sm font-bold text-gray-900">{grower.onTimeDelivery}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${grower.onTimeDelivery}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Quality Score</span>
              <span className="text-sm font-bold text-gray-900">{grower.rating * 20}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${grower.rating * 20}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Risk Score</span>
              <span className="text-sm font-bold text-gray-900">{grower.riskScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${grower.riskScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Geolocation</h3>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <MapPin className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-600">
            Lat: {grower.location.coordinates?.lat || 'N/A'}, 
            Lng: {grower.location.coordinates?.lng || 'N/A'}
          </p>
          <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
}

function RiskAssessmentTab({ grower, riskAssessment }) {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBg = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-50 border-green-200';
      case 'Medium': return 'bg-yellow-50 border-yellow-200';
      case 'High': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk */}
      <div className={`border-2 rounded-lg p-6 ${getRiskBg(riskAssessment.overallRisk)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Overall Risk Assessment</h3>
          <span className={`text-3xl font-bold ${getRiskColor(riskAssessment.overallRisk)}`}>
            {riskAssessment.overallRisk}
          </span>
        </div>
        <p className="text-gray-700">{riskAssessment.recommendation}</p>
        <div className="mt-4 flex items-center gap-2">
          <Shield className={getRiskColor(riskAssessment.overallRisk)} size={20} />
          <span className="font-medium">Risk Score: {riskAssessment.score}/100</span>
        </div>
      </div>

      {/* Strengths */}
      {riskAssessment.strengths.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Strengths</h3>
          <div className="space-y-2">
            {riskAssessment.strengths.map((strength, i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-medium text-gray-900">{strength.type}</div>
                  <div className="text-sm text-gray-600">{strength.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {riskAssessment.warnings.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Warnings</h3>
          <div className="space-y-2">
            {riskAssessment.warnings.map((warning, i) => (
              <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-medium text-gray-900">{warning.type}</div>
                  <div className="text-sm text-gray-600">{warning.description}</div>
                  {warning.mitigation && (
                    <div className="text-sm text-yellow-700 mt-1">
                      <strong>Mitigation:</strong> {warning.mitigation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {riskAssessment.risks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Risks</h3>
          <div className="space-y-2">
            {riskAssessment.risks.map((risk, i) => (
              <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-medium text-gray-900">{risk.type}</div>
                  <div className="text-sm text-gray-600">{risk.description}</div>
                  {risk.mitigation && (
                    <div className="text-sm text-red-700 mt-1">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

