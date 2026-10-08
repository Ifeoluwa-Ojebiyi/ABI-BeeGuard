import React, { useState } from 'react';
import { COMPETITOR_BENCHMARK, NOVELTY_PATENT_CLAIMS } from '../data/priorArtData';

export const PriorArtBenchmarking: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const runPatentAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/gemini/prior-art-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventionClaims: NOVELTY_PATENT_CLAIMS,
          targetCompetitors: COMPETITOR_BENCHMARK,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAuditResult(data.analysis);
      }
    } catch (err) {
      console.error('Failed to run prior art audit:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Strategic Advisory Statement */}
      <div className="border border-slate-800 bg-slate-900/80 p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <span>INTELLECTUAL PROPERTY AUDIT</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>COMPETITOR BENCHMARK</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>FREEDOM-TO-OPERATE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Patent Landscape, Prior-Art & Novelty Defense
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
          True defensibility comes from novel physical-biological architecture, specific data models, and localized unit economics—not generic AI branding.
          Existing market solutions either treat beehives as isolated hobbyist scale units (BroodMinder, Arnia) or rent closed proprietary hardware to commercial industrial monocultures at high seasonal subscriptions (BeeHero).
          ABI-BEEGUARD pioneers the dual-transduction paradigm: turning low-cost hives into territorial environmental hazard stations.
        </p>

        {/* Action Button to Run Gemini IP Analysis */}
        <div className="pt-2">
          <button
            onClick={runPatentAudit}
            disabled={isAuditing}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {isAuditing ? 'Running Legal & Prior-Art Audit...' : 'Run Gemini AI Patent Novelty Audit'}
          </button>
        </div>
      </div>

      {/* AI Patent Audit Callout if triggered */}
      {auditResult && (
        <div className="border border-amber-500/40 bg-amber-500/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                GEMINI IP STRATEGY EVALUATION
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Freedom-to-Operate & Patentability Assessment
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                {auditResult.patentabilityScore} / 100
              </span>
              <span className="block text-[10px] font-mono text-slate-400">
                Novelty Index
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {auditResult.freedomToOperateAssessment}
          </p>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] font-mono uppercase text-amber-300 font-bold block mb-1">
              Recommended Filing Strategy:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {auditResult.recommendedPatentStrategy}
            </p>
          </div>
        </div>
      )}

      {/* Comprehensive Competitor Comparison Table */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Head-to-Head Architectural Benchmark
            </h3>
            <p className="text-xs text-slate-400">
              Comparing ABI-BEEGUARD against global commercial and open-source apiculture systems
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            6 Systems Evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">System / Provider</th>
                <th className="py-3 px-3">Unit Hardware Cost</th>
                <th className="py-3 px-3">Connectivity & Power</th>
                <th className="py-3 px-3">Acoustic Processing</th>
                <th className="py-3 px-3">Environmental Bio-Mesh</th>
                <th className="py-3 px-3">Key Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {COMPETITOR_BENCHMARK.map((entry, idx) => {
                const isOurInvention = idx === 0;
                return (
                  <tr
                    key={entry.company}
                    className={`transition-colors ${
                      isOurInvention
                        ? 'bg-amber-400/10 font-medium text-white'
                        : 'hover:bg-slate-850/40'
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-white">
                      <div className="flex items-center gap-1.5">
                        {isOurInvention && (
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        )}
                        <span>{entry.company}</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {entry.origin}
                      </span>
                    </td>
                    <td className={`py-3 px-3 tabular-nums ${isOurInvention ? 'text-amber-400 font-bold' : ''}`}>
                      {entry.hardwareCost}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {entry.connectivity}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans text-[11px] max-w-xs">
                      {entry.acousticAnalysis}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans text-[11px] max-w-xs">
                      {entry.environmentalBioMesh}
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-sans text-[11px] max-w-xs">
                      {entry.limitations}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* The 3 Core Novelty Claims Breakdown */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            The 3 Independent Novelty Patent Claims
          </h3>
          <p className="text-xs text-slate-400">
            Formulated according to standard Patent Cooperation Treaty (PCT) specifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {NOVELTY_PATENT_CLAIMS.map((claim) => (
            <div
              key={claim.claimNumber}
              className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  {claim.claimNumber}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                  {claim.title}
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mt-2.5">
                  {claim.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900">
                <span className="text-[11px] font-mono text-emerald-400 block">
                  Status: {claim.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
