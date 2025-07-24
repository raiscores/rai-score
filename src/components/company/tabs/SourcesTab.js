// /src/components/company/tabs/SourcesTab.js
import React from 'react';
import {
  Calendar,
  CheckCircle,
  Shield,
  Clock,
  FileText,
  Globe,
  Info,
  ExternalLink
} from 'lucide-react';

/**
 * SourcesTab component displays comprehensive research sources analysis
 * 
 * Shows detailed breakdown of sources used in company assessment including:
 * - Source statistics and quality indicators
 * - Sources grouped by document type (ESG Reports, Policy Pages, etc.)
 * - Individual source cards with metadata
 * - Sources mapped to specific assessment pillars
 * - Source methodology and verification standards
 * 
 * @param {Object} props - Component props
 * @param {Object} props.companyData - Complete company data including sources
 */
const SourcesTab = ({ companyData }) => {
  return (
    <div className="space-y-8">
      {/* Sources Overview Header with statistics and quality indicators */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Research Sources</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Last updated: June 2025</span>
          </div>
        </div>
        
        {/* Source Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {companyData.summary?.sourcesUsed?.filter(s => s.sourceUsed).length || "N/A"}
            </div>
            <div className="text-sm text-blue-700">Sources Used</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {companyData.summary?.sourcesUsed?.filter(s => s.documentType === 'ESG Report').length || "N/A"}
            </div>
            <div className="text-sm text-green-700">ESG Reports</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {companyData.summary?.sourcesUsed?.filter(s => s.documentType === 'Blog').length || "N/A"}
            </div>
            <div className="text-sm text-purple-700">Policy Pages</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">High</div>
            <div className="text-sm text-orange-700">Confidence</div>
          </div>
        </div>
        
        {/* Quality Indicators */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">Verified Sources</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">Official Company Documents</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700">Recently Updated</span>
          </div>
        </div>
      </div>

      {/* Sources by Category - Groups sources by document type */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Sources by Category</h3>
        
        {/* Group sources by document type and render each category */}
        {companyData.summary?.sourcesUsed && 
          Object.entries(
            companyData.summary.sourcesUsed
              .filter(source => source.sourceUsed && source.documentType)
              .reduce((acc, source) => {
                const type = source.documentType || 'Other';
                if (!acc[type]) acc[type] = [];
                acc[type].push(source);
                return acc;
              }, {})
          ).map(([category, sources]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {/* Category icons based on document type */}
                  {category === 'ESG Report' && <FileText className="w-5 h-5 text-green-600" />}
                  {category === 'Blog' && <Globe className="w-5 h-5 text-blue-600" />}
                  {category === 'Other' && <Info className="w-5 h-5 text-gray-600" />}
                  {category} ({sources.length})
                </h4>
                <span className="text-sm text-gray-500">
                  {Math.round((sources.length / companyData.summary.sourcesUsed.filter(s => s.sourceUsed).length) * 100)}% of total sources
                </span>
              </div>
              
              {/* Individual source cards within each category */}
              <div className="grid gap-4">
                {sources.map((source, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                          {source.title || 'Untitled Source'}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {source.summary || 'No summary available'}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {source.retrievedAt ? new Date(source.retrievedAt).toLocaleDateString() : 'Unknown date'}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Source URL display */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Source URL:</div>
                      <div className="text-sm font-mono text-gray-700 break-all">
                        {source.url}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>

      {/* Pillar Source Breakdown - Shows which sources were used for each pillar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sources by Assessment Pillar</h3>
        
        <div className="space-y-4">
          {companyData.pillarDetails && Object.entries(companyData.pillarDetails).map(([pillarName, details]) => (
            <div key={pillarName} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{pillarName}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {details.relevantSources?.length || 0} sources
                  </span>
                  {/* Score indicator dot */}
                  <div className={`w-2 h-2 rounded-full ${
                    (details.score || 0) >= 0.8 ? 'bg-green-500' : 
                    (details.score || 0) >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
              </div>
              
              {/* Display relevant sources for this pillar */}
              {details.relevantSources && details.relevantSources.length > 0 ? (
                <div className="space-y-2">
                  {details.relevantSources.slice(0, 2).map((source, index) => (
                    <div key={index} className="bg-gray-50 rounded p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {source.title || 'Untitled Source'}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {source.summary}
                      </div>
                      <div className="text-xs text-gray-500">
                        {source.documentType} • {source.retrievedAt ? new Date(source.retrievedAt).toLocaleDateString() : 'Unknown date'}
                      </div>
                    </div>
                  ))}
                  {details.relevantSources.length > 2 && (
                    <div className="text-center">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View {details.relevantSources.length - 2} more sources
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">No sources available for this pillar</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Source Methodology - Explains how sources are collected and verified */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Source Methodology</h3>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-700 mb-4">
            Our AI research system systematically evaluates companies using publicly available information 
            from official company sources, sustainability reports, and verified documentation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Source Verification</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Official company websites and policies</li>
                <li>• Published ESG and sustainability reports</li>
                <li>• Verified press releases and announcements</li>
                <li>• Public regulatory filings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Standards</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time source validation</li>
                <li>• Content freshness verification</li>
                <li>• Cross-reference fact checking</li>
                <li>• Confidence scoring system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features CTA - Hidden for now, can be uncommented later */}
      {/* 
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Get Complete Source Access</h3>
          <p className="text-blue-100 mb-6">
            Access full source documentation, detailed analysis, and advanced filtering tools. 
            Perfect for compliance teams, investors, and researchers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Pricing
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            14-day free trial • Cancel anytime • No credit card required
          </p>
        </div>
      </div>
      */}
    </div>
  );
};

export default SourcesTab;