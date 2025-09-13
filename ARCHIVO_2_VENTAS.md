# 📄 ARCHIVO 4: src/components/layout/Header.tsx

Crea el archivo `src/components/layout/Header.tsx` y copia este código:

```typescript
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
```

# 📄 ARCHIVO 5: src/app/ventas/page.tsx - CON BÚSQUEDA CLIENTES

Crea el archivo `src/app/ventas/page.tsx` y copia este código:

```typescript
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
```

# 📄 ARCHIVO 6: src/app/gastos/page.tsx - MÓDULO GASTOS COMPLETO

Crea el archivo `src/app/gastos/page.tsx` y copia este código:

```typescript
"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { GastosList } from '@/components/gastos/GastosList'
import { GastoForm } from '@/components/gastos/GastoForm'
import { GastosReportes } from '@/components/gastos/GastosReportes'

export default function GastosPage() {
  const [activeTab, setActiveTab] = useState('lista')
  const [editingGasto, setEditingGasto] = useState<any>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">💸 Gestión de Gastos</h1>
              <p className="text-gray-600 mt-1">Control completo de gastos operativos</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Gastos del mes</p>
              <p className="text-2xl font-bold text-red-600">Gs. 2.450.000</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('lista')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lista'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lista de Gastos
              </button>
              <button
                onClick={() => setActiveTab('nuevo')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'nuevo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {editingGasto ? 'Editar Gasto' : 'Nuevo Gasto'}
              </button>
              <button
                onClick={() => setActiveTab('reportes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reportes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reportes
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'lista' && (
              <GastosList 
                onEdit={(gasto) => {
                  setEditingGasto(gasto)
                  setActiveTab('nuevo')
                }}
              />
            )}
            {activeTab === 'nuevo' && (
              <GastoForm 
                editingGasto={editingGasto}
                onSave={() => {
                  setEditingGasto(null)
                  setActiveTab('lista')
                }}
                onCancel={() => {
                  setEditingGasto(null)
                  setActiveTab('lista')
                }}
              />
            )}
            {activeTab === 'reportes' && <GastosReportes />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
```