import React from 'react';
import { Link } from 'react-router-dom';
import { Info, BookOpen } from 'lucide-react';
import PillarCard from '../PillarCard';
import PillarHeatmap from '../PillarHeatmap';
import EvidenceBreakdownBar from '../EvidenceBreakdownBar';

const OverviewTab = ({
  companyData,
  PILLAR_ICONS,
  onViewSources,
}) => {
  // Split pillars into scored (full cards) and unscored (compact rows)
  const pillarEntries = companyData.pillar_scores
    ? Object.entries(companyData.pillar_scores)
    : [];
  const scoredPillars = pillarEntries.filter(([, d]) => (d.score ?? 0) > 0);
  const unscoredPillars = pillarEntries.filter(([, d]) => (d.score ?? 0) === 0);

  const handlePillarClick = (key) => {
    const el = document.getElementById(`pillar-${key}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Check if there's actual evidence to visualize
  const hasEvidenceData = companyData.evidence_breakdown?.by_type &&
    ((companyData.evidence_breakdown.by_type.OPERATIONAL || 0) +
     (companyData.evidence_breakdown.by_type.POLICY || 0) +
     (companyData.evidence_breakdown.by_type.NARRATIVE || 0)) > 0;

  return (
    <div className="space-y-10">
      {/* Evidence quality distribution — hidden when no evidence exists */}
      {hasEvidenceData && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Evidence Quality</h2>
          <EvidenceBreakdownBar evidenceBreakdown={companyData.evidence_breakdown} />
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              to="/methodology"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Evidence scoring methodology
            </Link>
          </div>
        </div>
      )}

      {/* Pillar heatmap — at-a-glance score pattern */}
      {companyData.pillar_scores && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Pillar Overview</h2>
          <PillarHeatmap
            pillarScores={companyData.pillar_scores}
            PILLAR_ICONS={PILLAR_ICONS}
            onPillarClick={handlePillarClick}
          />
        </div>
      )}

      {/* Individual pillar assessment cards — single column for report-like rhythm */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Pillar Assessments</h2>
        <div className="space-y-4">
          {/* Scored pillars — full cards */}
          {scoredPillars.map(([pillarKey, details]) => {
            const Icon = PILLAR_ICONS[pillarKey] || Info;
            return (
              <div id={`pillar-${pillarKey}`} key={pillarKey}>
                <PillarCard
                  name={details.display_name}
                  score={details.score ?? 0}
                  max={details.max_score ?? 2}
                  icon={Icon}
                  bestEvidenceType={details.best_evidence_type}
                  findings={details.findings}
                  sourceCount={details.source_count ?? 0}
                  onViewSources={onViewSources}
                />
              </div>
            );
          })}

          {/* Unscored pillars — compact rows in a single card */}
          {unscoredPillars.length > 0 && (
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-1">
                No Qualifying Public Evidence ({unscoredPillars.length} {unscoredPillars.length === 1 ? 'pillar' : 'pillars'})
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                No documented evidence was identified for {unscoredPillars.length === 1 ? 'this pillar' : 'these pillars'} during assessment.
              </p>
              <div>
                {unscoredPillars.map(([pillarKey, details]) => {
                  const Icon = PILLAR_ICONS[pillarKey] || Info;
                  return (
                    <div
                      key={pillarKey}
                      id={`pillar-${pillarKey}`}
                      className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                    >
                      <div className="p-1.5 bg-gray-100 rounded-lg flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{details.display_name}</span>
                      <span className="text-sm text-gray-400 ml-auto font-medium">0/{details.max_score ?? 2}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
