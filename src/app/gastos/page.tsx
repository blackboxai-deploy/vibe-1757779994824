"use client"

import React from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function GastosPage() {
  const gastos = [
    {
      id: 'GAS001',
      fecha: '2024-01-15',
      concepto: 'Compra de shampoo para autos',
      categoria: 'Insumos',
      monto: 150000,
      proveedor: 'AutoLimpieza S.A.'
    },
    {
      id: 'GAS002',
      fecha: '2024-01-14',
      concepto: 'Reparación de aspiradora',
      categoria: 'Mantenimiento',
      monto: 320000,
      proveedor: 'TecnoService'
    },
    {
      id: 'GAS003',
      fecha: '2024-01-13',
      concepto: 'Pago de luz eléctrica',
      categoria: 'Servicios',
      monto: 450000,
      proveedor: 'ANDE'
    },
    {
      id: 'GAS004',
      fecha: '2024-01-10',
      concepto: 'Salario empleado Juan Pérez',
      categoria: 'Nómina',
      monto: 2200000,
      proveedor: '-'
    }
  ]

  const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">💸 Gestión de Gastos</h1>
          <p className="text-gray-600 mt-1">Control completo de gastos operativos</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lista de Gastos</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fecha / ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Concepto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Proveedor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gastos.map((gasto) => (
                  <tr key={gasto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{gasto.id}</div>
                        <div className="text-sm text-gray-500">{gasto.fecha}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{gasto.concepto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        gasto.categoria === 'Insumos' ? 'bg-blue-100 text-blue-800' :
                        gasto.categoria === 'Mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                        gasto.categoria === 'Servicios' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {gasto.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-red-600">
                        Gs. {gasto.monto.toLocaleString('es-PY')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{gasto.proveedor}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-blue-900">Total de Gastos</h4>
              <p className="text-2xl font-bold text-red-600">
                Gs. {totalGastos.toLocaleString('es-PY')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}