"use client"

import React from 'react'

const popularServices = [
  {
    name: 'Lavado Full Detail',
    count: 12,
    percentage: 35,
    revenue: 'Gs. 540.000'
  },
  {
    name: 'Lavado Básico',
    count: 8,
    percentage: 25,
    revenue: 'Gs. 200.000'
  },
  {
    name: 'Pulido',
    count: 6,
    percentage: 20,
    revenue: 'Gs. 360.000'
  }
]

export function PopularServices() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Servicios Populares</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {popularServices.map((service, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{service.name}</h4>
                <span className="text-sm text-gray-600">{service.count} servicios</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${service.percentage}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-green-600">{service.revenue}</span>
                <span className="text-gray-500">{service.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}