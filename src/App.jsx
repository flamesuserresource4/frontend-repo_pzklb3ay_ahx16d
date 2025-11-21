import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import PracticeCard from './components/PracticeCard'
import RecommendationList from './components/RecommendationList'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(true)
  const [practices, setPractices] = useState([])
  const [filters, setFilters] = useState({ crop: '', risk: '', cost: '', q: '' })
  const [farm, setFarm] = useState({ crops: [], risks: [], budget: '' })
  const [recs, setRecs] = useState([])
  const [seeding, setSeeding] = useState(false)

  const loadPractices = async () => {
    setLoading(true)
    try {
      const url = new URL(baseUrl + '/practices')
      Object.entries(filters).forEach(([k, v]) => {
        if (v) url.searchParams.set(k, v)
      })
      const res = await fetch(url.toString())
      const data = await res.json()
      setPractices(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPractices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.crop, filters.risk, filters.cost, filters.q])

  const seedIfNeeded = async () => {
    try {
      setSeeding(true)
      await fetch(baseUrl + '/seed/practices', { method: 'POST' })
      await loadPractices()
    } catch (e) {
      console.error(e)
    } finally {
      setSeeding(false)
    }
  }

  const requestRecs = async () => {
    try {
      const res = await fetch(baseUrl + '/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farm),
      })
      const data = await res.json()
      setRecs(data.items || [])
    } catch (e) {
      console.error(e)
    }
  }

  const toggleValue = (arr, val) => {
    const s = new Set(arr)
    if (s.has(val)) s.delete(val)
    else s.add(val)
    return [...s]
  }

  const commonCrops = ['maize', 'rice', 'wheat', 'vegetables', 'beans', 'coffee']
  const commonRisks = ['drought', 'heat', 'flood', 'salinity', 'pests']
  const costs = ['low', 'medium', 'high']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <Header />

        <div className="grid md:grid-cols-12 gap-6 mt-4">
          {/* Left: filters + farm profile */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-slate-800/60 border border-blue-500/10 rounded-2xl p-5">
              <h2 className="text-white font-semibold">Browse Practices</h2>
              <div className="mt-3 space-y-3">
                <input
                  value={filters.q}
                  onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                  placeholder="Search..."
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={filters.crop}
                  onChange={(e) => setFilters({ ...filters, crop: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">All crops</option>
                  {commonCrops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={filters.risk}
                  onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">All risks</option>
                  {commonRisks.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <select
                  value={filters.cost}
                  onChange={(e) => setFilters({ ...filters, cost: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">Any cost</option>
                  {costs.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <button
                  onClick={seedIfNeeded}
                  className="w-full text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
                  disabled={seeding}
                >
                  {seeding ? 'Seeding...' : 'Seed default practices'}
                </button>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-blue-500/10 rounded-2xl p-5">
              <h2 className="text-white font-semibold">Your Farm Profile</h2>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="text-xs text-blue-200/70 mb-1">Crops</div>
                  <div className="flex flex-wrap gap-2">
                    {commonCrops.map((c) => (
                      <button key={c} onClick={() => setFarm({ ...farm, crops: toggleValue(farm.crops, c) })}
                        className={`text-xs px-2 py-1 rounded border ${farm.crops.includes(c) ? 'bg-blue-500/20 border-blue-400 text-blue-100' : 'bg-slate-900/60 border-slate-700 text-blue-200/80'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-blue-200/70 mb-1">Risks</div>
                  <div className="flex flex-wrap gap-2">
                    {commonRisks.map((r) => (
                      <button key={r} onClick={() => setFarm({ ...farm, risks: toggleValue(farm.risks, r) })}
                        className={`text-xs px-2 py-1 rounded border ${farm.risks.includes(r) ? 'bg-amber-500/20 border-amber-400 text-amber-100' : 'bg-slate-900/60 border-slate-700 text-amber-200/80'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-blue-200/70 mb-1">Budget</div>
                  <div className="flex gap-2">
                    {costs.map((c) => (
                      <button key={c} onClick={() => setFarm({ ...farm, budget: c })}
                        className={`text-xs px-3 py-1 rounded border ${farm.budget === c ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100' : 'bg-slate-900/60 border-slate-700 text-emerald-200/80'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={requestRecs} className="w-full text-sm bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg">
                  Get recommendations
                </button>
              </div>

              {recs.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-white font-medium mb-2">Top matches</h3>
                  <RecommendationList items={recs} />
                </div>
              )}
            </div>
          </div>

          {/* Right: practice list */}
          <div className="md:col-span-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">Practice Library</h2>
              {loading && <div className="text-xs text-blue-200/70">Loading...</div>}
            </div>
            {(!practices || practices.length === 0) && (
              <div className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-6 text-blue-200/80">
                No practices found. Use Seed to add a starter set.
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {practices.map((p) => (
                <PracticeCard key={p.id} practice={p} />
              ))}
            </div>
          </div>
        </div>

        <footer className="py-10 text-center text-blue-200/60 text-xs">
          Built with a focus on practical resilience: water management, heat mitigation, and risk-aware planning.
        </footer>
      </div>
    </div>
  )
}

export default App
