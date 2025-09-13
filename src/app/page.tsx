"use client"

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentSales } from '@/components/dashboard/RecentSales'
import { PopularServices } from '@/components/dashboard/PopularServices'
import { InventoryAlerts } from '@/components/dashboard/InventoryAlerts'
import { TimbradoAlerts } from '@/components/TimbradoAlerts'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header con fecha y hora */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard - Sistema de Lavadero</h1>
              <p className="text-gray-600 mt-1">Gestión completa del negocio</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-blue-600">
                {currentTime.toLocaleTimeString('es-PY')}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString('es-PY', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Métricas principales */}
        <DashboardStats />

        {/* Grid de información secundaria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentSales />
          <PopularServices />
        </div>

        {/* Alertas de inventario */}
        <InventoryAlerts />
        
        {/* Alertas de Timbrado DGII */}
        <TimbradoAlerts />
      </div>
    </DashboardLayout>
  )
}