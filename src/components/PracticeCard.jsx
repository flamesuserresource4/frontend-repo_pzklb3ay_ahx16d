import React from 'react'

function PracticeCard({ practice }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-5 hover:border-blue-500/30 transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{practice.title}</h3>
        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-200 border border-blue-500/30">
          {practice.cost_level}
        </span>
      </div>
      <p className="text-blue-200/80 text-sm mt-2">{practice.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {practice.crops?.map((c) => (
          <span key={c} className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200 border border-slate-600">{c}</span>
        ))}
        {practice.risks?.map((r) => (
          <span key={r} className="text-xs px-2 py-1 rounded bg-slate-700 text-amber-200 border border-slate-600">{r}</span>
        ))}
      </div>
    </div>
  )
}

export default PracticeCard
