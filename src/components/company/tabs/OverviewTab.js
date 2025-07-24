// /src/components/company/tabs/OverviewTab.js
import React from 'react';
import { BarChart3, Shield, Info } from 'lucide-react';
import PillarCard from '../PillarCard';
import { getColorClassesFromStatus } from '../../../utils/colorMapping';

/**
 * OverviewTab component displays executive summary and pillar breakdown
 * 
 * Shows key metrics cards, overall findings, and individual pillar assessments
 * using the imported PillarCard component for consistent styling.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.companyData - Complete company data
 * @param {number} props.fullPillars - Number of fully implemented pillars
 * @param {number} props.totalPillars - Total number of pillars
 * @param {string} props.pillarStatus - Overall pillar implementation status
 * @param {Object} props.performanceColor - Performance color classes
 * @param {number} props.performancePercentile - Performance percentile ranking
 * @param {Object} props.PILLAR_ICONS - Mapping of pillar names to icons
 * @param {boolean} props.animateScores - Whether to animate score progress bars
 * @param {function} props.onViewSources - Callback to switch to sources tab
 */
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
          
          {/* Data confidence indicator */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Confidence</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">High</div>
            <div className="text-sm text-purple-700">Data reliability</div>
          </div>
        </div>
        
        {/* Overall findings text */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {companyData.overallFindings || "Responsible AI assessment not available for this company."}
          </p>
        </div>
      </div>

      {/* Individual pillar assessments */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsible AI Assessment</h2>
        <div className="grid gap-6">
          {companyData.pillarDetails &&
            Object.entries(companyData.pillarDetails).map(([pillarName, details]) => {
              const Icon = PILLAR_ICONS[pillarName] || Info;
              const scaledScore = (details.score ?? 0) * 10; // Convert 0-1 to 0-10 scale
              return (
                <PillarCard
                  key={pillarName}
                  name={pillarName}
                  score={scaledScore}
                  max={10}
                  icon={Icon}
                  status={details.status || 'excellent'}
                  description={details.findings || details.justification}
                  sources={details.relevantSources?.length || 0}
                  confidence="High"
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