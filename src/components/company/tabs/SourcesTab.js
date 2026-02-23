// /src/components/company/tabs/SourcesTab.js
import React, { useMemo } from 'react';
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

/** Format artifact_type for display (e.g., "blog_post" → "Blog Post") */
const formatArtifactType = (type) => {
  if (!type) return 'Other';
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/** Format source_tier for display (e.g., "company_owned" → "Company Owned") */
const formatSourceTier = (tier) => {
  if (!tier) return 'Unknown';
  return tier
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/** Get icon for artifact type category */
const getArtifactIcon = (type) => {
  switch (type) {
    case 'esg_report':
    case 'annual_report':
    case 'proxy_statement':
      return <FileText className="w-5 h-5 text-green-600" />;
    case 'blog_post':
    case 'press_release':
    case 'help_page':
      return <Globe className="w-5 h-5 text-blue-600" />;
    default:
      return <Info className="w-5 h-5 text-gray-600" />;
  }
};

/** Get tier badge color */
const getTierColor = (tier) => {
  switch (tier) {
    case 'company_owned': return 'bg-blue-100 text-blue-700';
    case 'authority': return 'bg-green-100 text-green-700';
    case 'third_party': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const SourcesTab = ({ companyData }) => {
  // Aggregate all unique sources across all pillars, dedup by source_id
  const allSources = useMemo(() => {
    if (!companyData.pillar_scores) return [];
    const sourceMap = new Map();
    Object.values(companyData.pillar_scores).forEach(pillar => {
      if (pillar.relevant_sources) {
        pillar.relevant_sources.forEach(source => {
          if (source.source_id && !sourceMap.has(source.source_id)) {
            sourceMap.set(source.source_id, source);
          }
        });
      }
    });
    return Array.from(sourceMap.values());
  }, [companyData.pillar_scores]);

  // Group sources by artifact_type
  const sourcesByType = useMemo(() => {
    const groups = {};
    allSources.forEach(source => {
      const type = source.artifact_type || 'other';
      if (!groups[type]) groups[type] = [];
      groups[type].push(source);
    });
    return groups;
  }, [allSources]);

  return (
    <div className="space-y-8">
      {/* Sources Overview Header with statistics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Research Sources</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Published: {companyData.published_at
                ? new Date(companyData.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : 'N/A'}
            </span>
          </div>
        </div>

        {/* Source Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {companyData.total_sources_used ?? allSources.length}
            </div>
            <div className="text-sm text-blue-700">Sources Used</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {companyData.total_evidence_items ?? 'N/A'}
            </div>
            <div className="text-sm text-green-700">Evidence Items</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {companyData.pillars_with_evidence ?? 'N/A'}
            </div>
            <div className="text-sm text-purple-700">Pillars with Evidence</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Object.keys(sourcesByType).length}
            </div>
            <div className="text-sm text-orange-700">Source Categories</div>
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
            <span className="text-sm text-gray-700">Pipeline Validated</span>
          </div>
        </div>
      </div>

      {/* Sources by Category */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Sources by Category</h3>

        {Object.entries(sourcesByType).map(([artifactType, sources]) => (
          <div key={artifactType} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {getArtifactIcon(artifactType)}
                {formatArtifactType(artifactType)} ({sources.length})
              </h4>
              <span className="text-sm text-gray-500">
                {Math.round((sources.length / allSources.length) * 100)}% of total sources
              </span>
            </div>

            {/* Individual source cards within each category */}
            <div className="grid gap-4">
              {sources.map((source) => (
                <div key={source.source_id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors"
                          >
                            {source.title || 'Untitled Source'}
                          </a>
                        ) : (
                          source.title || 'Untitled Source'
                        )}
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        {source.summary || 'No summary available'}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierColor(source.source_tier)}`}>
                          {formatSourceTier(source.source_tier)}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          Verified
                        </span>
                      </div>
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors ml-4"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Source URL display */}
                  {source.url && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Source URL:</div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-blue-600 hover:text-blue-700 break-all"
                      >
                        {source.url}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {allSources.length === 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center text-gray-500">
            No source data available for this company.
          </div>
        )}
      </div>

      {/* Sources by Assessment Pillar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sources by Assessment Pillar</h3>

        <div className="space-y-4">
          {companyData.pillar_scores && Object.entries(companyData.pillar_scores).map(([pillarKey, details]) => (
            <div key={pillarKey} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{details.display_name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {details.source_count ?? 0} sources
                  </span>
                  {/* Score indicator dot */}
                  <div className={`w-2 h-2 rounded-full ${
                    details.score === details.max_score ? 'bg-green-500' :
                    details.score >= 1 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
              </div>

              {/* Display relevant sources for this pillar */}
              {details.relevant_sources && details.relevant_sources.length > 0 ? (
                <div className="space-y-2">
                  {details.relevant_sources.slice(0, 2).map((source) => (
                    <div key={source.source_id} className="bg-gray-50 rounded p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors"
                          >
                            {source.title || 'Untitled Source'}
                          </a>
                        ) : (
                          source.title || 'Untitled Source'
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {source.summary}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatArtifactType(source.artifact_type)} &bull; {formatSourceTier(source.source_tier)}
                      </div>
                    </div>
                  ))}
                  {details.relevant_sources.length > 2 && (
                    <div className="text-center">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View {details.relevant_sources.length - 2} more sources
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

      {/* Source Methodology */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Source Methodology</h3>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-700 mb-4">
            Our evaluation pipeline systematically collects, validates, and scores evidence from
            publicly available sources. LLMs extract verbatim evidence only; all scoring is
            deterministic. If evidence is not publicly documented and verifiable, it does not
            exist for scoring purposes.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Source Tiers</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>&bull; <strong>Company Owned:</strong> Official websites, policies, reports</li>
                <li>&bull; <strong>Authority:</strong> Regulatory filings, SEC documents</li>
                <li>&bull; <strong>Third Party:</strong> Independent assessments (capped scoring)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Evidence Types</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>&bull; <strong>OPERATIONAL (2 pts):</strong> Deployed systems, measurable practices</li>
                <li>&bull; <strong>POLICY (1 pt):</strong> Written policies and commitments</li>
                <li>&bull; <strong>NARRATIVE (0 pts):</strong> General statements without specifics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcesTab;
