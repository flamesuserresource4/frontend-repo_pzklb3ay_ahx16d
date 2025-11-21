import React from 'react'

function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 grid place-items-center">
          <span className="text-blue-300 font-bold">CR</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Climate Resilient Agriculture</h1>
          <p className="text-xs text-blue-200/70">Practical practices and tailored recommendations</p>
        </div>
      </div>
      <a href="/test" className="text-sm text-blue-200 hover:text-white transition">System status</a>
    </header>
  )
}

export default Header
