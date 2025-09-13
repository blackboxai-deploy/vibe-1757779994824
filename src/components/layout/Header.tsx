"use client"

import React from 'react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">1SOLUTION</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  )
}