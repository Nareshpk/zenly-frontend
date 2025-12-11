import React from 'react'

export default function Dashboard() {
  return (
  <div>
      <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
      <p>Summary cards and widgets go here.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Stat card 1</div>
        <div className="p-4 bg-white rounded shadow">Stat card 2</div>
        <div className="p-4 bg-white rounded shadow">Stat card 3</div>
      </div>
    </div>
  )
}


