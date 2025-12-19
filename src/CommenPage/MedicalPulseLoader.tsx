import React from 'react'

function MedicalPulseLoader({name}:any) {
  return (
    <div className="flex flex-col items-center justify-center py-14">
      <div className="relative w-12 h-12 animate-spin">
        {/* Vertical bar */}
        <span className="absolute left-1/2 top-0 w-2 h-12 bg-green-600 -translate-x-1/2 rounded"></span>

        {/* Horizontal bar */}
        <span className="absolute top-1/2 left-0 w-12 h-2 bg-green-600 -translate-y-1/2 rounded"></span>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Loading doctors…
      </p>
    </div>
  );
}


export default MedicalPulseLoader
