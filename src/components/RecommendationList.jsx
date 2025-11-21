import React from 'react'

function RecommendationList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-blue-200/80 text-sm">
        Add your crops and risks to see tailored recommendations.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((r, idx) => (
        <div key={idx} className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-white font-semibold">{r.practice_title}</h4>
              <p className="text-xs text-blue-200/70 mt-1">{r.reasons?.join(' • ')}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-200/70">Match</div>
              <div className="text-lg font-bold text-white">{Math.round(r.match_score * 100)}%</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-200 border border-blue-500/30">{r.cost_level}</span>
            {r.crops?.map((c) => (
              <span key={c} className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200 border border-slate-600">{c}</span>
            ))}
            {r.risks?.map((x) => (
              <span key={x} className="text-xs px-2 py-1 rounded bg-slate-700 text-amber-200 border border-slate-600">{x}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecommendationList
