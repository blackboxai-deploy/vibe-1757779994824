"use client"

import React, { useState, useEffect } from 'react'

interface TimbradoConfig {
  numero: string
  fechaVencimiento: string
  cantidadMaxima: number
  cantidadUtilizada: number
  activo: boolean
}

const timbradoConfig: TimbradoConfig = {
  numero: 'T-12345678',
  fechaVencimiento: '2024-12-31',
  cantidadMaxima: 1000,
  cantidadUtilizada: 947, // ⚠️ ESTADO CRÍTICO PARA DEMOSTRACIÓN
  activo: true
}

export function TimbradoAlerts() {
  const [alerts, setAlerts] = useState<Array<{
    type: 'fecha' | 'cantidad' | 'critico'
    message: string
    severity: 'warning' | 'error'
  }>>([])

  useEffect(() => {
    const checkTimbradoStatus = () => {
      const newAlerts: typeof alerts = []
      const today = new Date()
      const vencimiento = new Date(timbradoConfig.fechaVencimiento)
      const diasRestantes = Math.ceil((vencimiento.getTime() - today.getTime()) / (1000 * 3600 * 24))
      const facturasRestantes = timbradoConfig.cantidadMaxima - timbradoConfig.cantidadUtilizada

      // ⚠️ ALERTA POR FECHA DE VENCIMIENTO
      if (diasRestantes <= 0) {
        newAlerts.push({
          type: 'critico',
          message: `🚨 TIMBRADO ${timbradoConfig.numero} VENCIDO desde ${Math.abs(diasRestantes)} días. RENOVAR INMEDIATAMENTE`,
          severity: 'error'
        })
      } else if (diasRestantes <= 10) {
        newAlerts.push({
          type: 'fecha',
          message: `⚠️ TIMBRADO ${timbradoConfig.numero} vence en ${diasRestantes} días (${timbradoConfig.fechaVencimiento})`,
          severity: 'error'
        })
      } else if (diasRestantes <= 30) {
        newAlerts.push({
          type: 'fecha',
          message: `📅 TIMBRADO ${timbradoConfig.numero} vence en ${diasRestantes} días`,
          severity: 'warning'
        })
      }

      // 📊 ALERTA POR CANTIDAD DE FACTURAS
      if (facturasRestantes <= 0) {
        newAlerts.push({
          type: 'critico',
          message: `🚨 TIMBRADO ${timbradoConfig.numero} AGOTADO: Se usaron todas las ${timbradoConfig.cantidadMaxima} facturas`,
          severity: 'error'
        })
      } else if (facturasRestantes <= 20) {
        newAlerts.push({
          type: 'cantidad',
          message: `⚠️ CRÍTICO: Solo quedan ${facturasRestantes} facturas del timbrado ${timbradoConfig.numero}`,
          severity: 'error'
        })
      } else if (facturasRestantes <= 100) {
        newAlerts.push({
          type: 'cantidad',
          message: `📊 ALERTA: Quedan ${facturasRestantes} facturas del timbrado ${timbradoConfig.numero} (${((timbradoConfig.cantidadUtilizada / timbradoConfig.cantidadMaxima) * 100).toFixed(1)}% usado)`,
          severity: 'warning'
        })
      }

      setAlerts(newAlerts)
    }

    checkTimbradoStatus()
    const interval = setInterval(checkTimbradoStatus, 60000) // Verificar cada minuto
    
    return () => clearInterval(interval)
  }, [])

  if (alerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg">✅</span>
          <div>
            <h3 className="font-semibold text-green-800">Timbrado DGII - Estado Normal</h3>
            <p className="text-sm text-green-700">
              Timbrado {timbradoConfig.numero}: {timbradoConfig.cantidadMaxima - timbradoConfig.cantidadUtilizada} facturas restantes
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            🚨 Control de Timbrado DGII
          </h3>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            ALERTA CRÍTICA
          </span>
        </div>
        
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 mb-4 ${
              alert.severity === 'error'
                ? 'bg-red-50 border-red-500 text-red-800'
                : 'bg-yellow-50 border-yellow-500 text-yellow-800'
            }`}
          >
            <p className="font-medium">{alert.message}</p>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Timbrado Actual</p>
            <p className="font-bold text-gray-900">{timbradoConfig.numero}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Facturas Usadas</p>
            <p className="font-bold text-red-600">
              {timbradoConfig.cantidadUtilizada} / {timbradoConfig.cantidadMaxima}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Vencimiento</p>
            <p className="font-bold text-yellow-600">{timbradoConfig.fechaVencimiento}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => alert('Funcionalidad: Ir a Configuración → Facturación')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Configurar Timbrado
          </button>
        </div>
      </div>
    </div>
  )
}