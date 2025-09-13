"use client"

import React from 'react'

const inventoryAlerts = [
  {
    product: 'Shampoo para Autos',
    currentStock: 5,
    minStock: 10,
    unit: 'litros',
    urgency: 'high'
  },
  {
    product: 'Cera Líquida',
    currentStock: 2,
    minStock: 8,
    unit: 'litros',
    urgency: 'high'
  },
  {
    product: 'Paños de Microfibra',
    currentStock: 12,
    minStock: 20,
    unit: 'unidades',
    urgency: 'medium'
  }
]

export function InventoryAlerts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Alertas de Inventario</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {inventoryAlerts.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              item.urgency === 'high' 
                ? 'bg-red-50 border-red-400' 
                : 'bg-yellow-50 border-yellow-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{item.product}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.urgency === 'high'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.urgency === 'high' ? 'CRÍTICO' : 'BAJO'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Stock actual:</p>
                  <p className="font-semibold">{item.currentStock} {item.unit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Stock mínimo:</p>
                  <p className="font-semibold">{item.minStock} {item.unit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}