"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function ConfiguracionPage() {
  const [logoEmpresa, setLogoEmpresa] = useState('')

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione un archivo de imagen válido')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setLogoEmpresa(base64)
        alert('Logo cargado exitosamente!')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">⚙️ Configuración del Sistema</h1>
          <p className="text-gray-600 mt-1">Ajustes generales y personalización</p>
        </div>

        {/* Configuración de Logo */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🖼️ Logo de la Empresa</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subir Logo de la Empresa
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Subir logo desde PC</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vista Previa del Logo
              </label>
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                {logoEmpresa ? (
                  <div className="text-center">
                    <img
                      src={logoEmpresa}
                      alt="Logo de la empresa"
                      className="mx-auto max-w-full h-20 object-contain border border-gray-100 rounded"
                    />
                    <p className="text-sm text-gray-600 mt-2">Logo cargado exitosamente</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <p className="text-sm">No hay logo seleccionado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Control de Timbrado */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Control de Timbrado DGII</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Timbrado
              </label>
              <input
                type="text"
                defaultValue="T-12345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento
              </label>
              <input
                type="date"
                defaultValue="2024-12-31"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Límite de Facturas
              </label>
              <input
                type="number"
                defaultValue="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">⚠️ Estado Actual</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-red-600">Facturas Usadas:</p>
                <p className="font-bold text-red-900">947 / 1000</p>
              </div>
              <div>
                <p className="text-red-600">Facturas Restantes:</p>
                <p className="font-bold text-red-900">53</p>
              </div>
              <div>
                <p className="text-red-600">Días para Vencer:</p>
                <p className="font-bold text-red-900">45 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}