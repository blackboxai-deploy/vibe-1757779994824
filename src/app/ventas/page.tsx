"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { VentasForm } from '@/components/ventas/VentasForm'
import { VentasHistory } from '@/components/ventas/VentasHistory'

export default function VentasPage() {
  const [activeTab, setActiveTab] = useState('nueva')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">💰 Módulo de Ventas</h1>
              <p className="text-gray-600 mt-1">Gestión completa de ventas y servicios</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total del día</p>
              <p className="text-2xl font-bold text-green-600">Gs. 1.250.000</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('nueva')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'nueva'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Nueva Venta
              </button>
              <button
                onClick={() => setActiveTab('historial')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'historial'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Historial de Ventas
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'nueva' && <VentasForm />}
            {activeTab === 'historial' && <VentasHistory />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}