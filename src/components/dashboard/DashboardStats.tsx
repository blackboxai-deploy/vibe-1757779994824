"use client"

import React from 'react'

const stats = [
  {
    title: 'Ventas de Hoy',
    value: 'Gs. 1.250.000',
    change: '+12%',
    changeType: 'positive',
    icon: '💰',
    color: 'blue'
  },
  {
    title: 'Servicios Realizados',
    value: '23',
    change: '+5 vs ayer',
    changeType: 'positive',
    icon: '🚗',
    color: 'green'
  },
  {
    title: 'Clientes Atendidos',
    value: '18',
    change: '+3 nuevos',
    changeType: 'positive',
    icon: '👥',
    color: 'purple'
  },
  {
    title: 'Stock Crítico',
    value: '4',
    change: 'Productos',
    changeType: 'warning',
    icon: '⚠️',
    color: 'yellow'
  }
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <div className={`flex items-center text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                <span className="mr-1">
                  {stat.changeType === 'positive' ? '↗️' : stat.changeType === 'warning' ? '⚠️' : '↘️'}
                </span>
                {stat.change}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'green' ? 'bg-green-100' :
              stat.color === 'purple' ? 'bg-purple-100' :
              'bg-yellow-100'
            }`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}