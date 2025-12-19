import React from 'react'

function ListLoader() {
    return (
        <div className="space-y-4 py-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 animate-pulse"
                >
                    <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            ))}
        </div>
    )
}

export default ListLoader
