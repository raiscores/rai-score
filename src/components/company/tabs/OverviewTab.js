// /src/components/company/tabs/OverviewTab.js
import React from 'react';
import { BarChart3, Shield, Info } from 'lucide-react';
import PillarCard from '../PillarCard';
import { getColorClassesFromStatus } from '../../../utils/colorMapping';

const OverviewTab = ({
  companyData,
  fullPillars,
  totalPillars,
  pillarStatus,
  performanceColor,
  performancePercentile,
  PILLAR_ICONS,
  animateScores,
  onViewSources
}) => {
  const pillarColor = getColorClassesFromStatus(pillarStatus);

  return (
    <div className="space-y-8">
      {/* Executive Summary with key metrics cards */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Pillar Implementation status */}
          <div className={`rounded-lg p-4 ${pillarColor.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <pillarColor.icon className={`w-5 h-5 ${pillarColor.text}`} />
              <span className={`font-semibold capitalize ${pillarColor.text}`}>{pillarStatus}</span>
            </div>
            <div className={`text-2xl font-bold ${pillarColor.text}`}>{fullPillars}/{totalPillars}</div>
            <div className={`text-sm ${pillarColor.text}`}>Pillars with full implementation</div>
          </div>

          {/* Performance ranking */}
          <div className={`rounded-lg p-4 ${performanceColor.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className={`w-5 h-5 ${performanceColor.text}`} />
              <span className={`font-semibold ${performanceColor.text}`}>Performance</span>
            </div>
            <div className={`text-2xl font-bold ${performanceColor.text}`}>
              {performancePercentile ? `${performancePercentile}th` : 'N/A'}
            </div>
            <div className={`text-sm ${performanceColor.text}`}>Percentile ranking</div>
          </div>

          {/* Evidence items indicator */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Evidence</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{companyData.total_evidence_items ?? 'N/A'}</div>
            <div className="text-sm text-purple-700">Evidence items analyzed</div>
          </div>
        </div>

        {/* Overall findings text */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {companyData.overall_findings || "Responsible AI assessment not available for this company."}
          </p>
        </div>
      </div>

      {/* Individual pillar assessments */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsible AI Assessment</h2>
        <div className="grid gap-6">
          {companyData.pillar_scores &&
            Object.entries(companyData.pillar_scores).map(([pillarKey, details]) => {
              const Icon = PILLAR_ICONS[pillarKey] || Info;
              const score = details.score ?? 0;
              const maxPillarScore = details.max_score ?? 2;

              // Derive status from score
              let status;
              if (score === maxPillarScore) status = 'excellent';
              else if (score >= 1) status = 'good';
              else if (score > 0) status = 'fair';
              else status = 'poor';

              const description = details.findings || 'No findings available.';

              return (
                <PillarCard
                  key={pillarKey}
                  name={details.display_name}
                  score={score}
                  max={maxPillarScore}
                  icon={Icon}
                  status={status}
                  description={description}
                  sources={details.source_count ?? 0}
                  evidenceType={details.best_evidence_type}
                  animateScores={animateScores}
                  onViewSources={onViewSources}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
