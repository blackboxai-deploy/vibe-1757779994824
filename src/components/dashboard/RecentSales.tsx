"use client"

import React from 'react'

const recentSales = [
  {
    id: '001234',
    cliente: 'María González',
    servicio: 'Lavado Full Detail',
    vehiculo: 'SUV',
    total: 'Gs. 45.000',
    tiempo: '10:30',
    estado: 'Completado'
  },
  {
    id: '001235',
    cliente: 'Carlos Mendoza',
    servicio: 'Lavado Básico',
    vehiculo: 'Auto',
    total: 'Gs. 25.000',
    tiempo: '11:15',
    estado: 'En proceso'
  },
  {
    id: '001236',
    cliente: 'Ana Rodríguez',
    servicio: 'Pulido + Inyección',
    vehiculo: 'Camioneta',
    total: 'Gs. 85.000',
    tiempo: '12:00',
    estado: 'Completado'
  }
]

export function RecentSales() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Ventas Recientes</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{sale.cliente}</h4>
                  <span className="text-sm text-gray-500">{sale.tiempo}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{sale.servicio}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{sale.vehiculo}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sale.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                    sale.estado === 'En proceso' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {sale.estado}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{sale.total}</p>
                  <p className="text-xs text-gray-500">#{sale.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}