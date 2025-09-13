"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    icon: '📊',
    label: 'Dashboard',
    href: '/',
    description: 'Resumen general'
  },
  {
    icon: '💰',
    label: 'Ventas',
    href: '/ventas',
    description: 'Nueva venta'
  },
  {
    icon: '🚗',
    label: 'Servicios',
    href: '/servicios',
    description: 'Gestión servicios'
  },
  {
    icon: '📦',
    label: 'Inventario',
    href: '/inventario',
    description: 'Control stock'
  },
  {
    icon: '👥',
    label: 'Clientes',
    href: '/clientes',
    description: 'Base clientes'
  },
  {
    icon: '💸',
    label: 'Gastos',
    href: '/gastos',
    description: 'Registro gastos'
  },
  {
    icon: '📈',
    label: 'Reportes',
    href: '/reportes',
    description: 'Informes y análisis'
  },
  {
    icon: '⚙️',
    label: 'Configuración',
    href: '/configuracion',
    description: 'Ajustes sistema'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:block hidden`}>
      
      {/* Logo y título */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            {/* Logo 1SOLUTION */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a7202697-678a-4e05-9b44-0a4b47e9194b.png" 
                alt="1SOLUTION Logo - Sistema de punto de venta para lavadero de autos"
                className="w-8 h-8 rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <span className="text-white font-bold text-sm hidden">1S</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">1SOLUTION</h1>
              <p className="text-xs text-gray-500">Sistema Lavadero</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-500">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Menú de navegación */}
      <nav className="px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer del sidebar */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500 truncate">Administrador</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 text-sm">⚙️</button>
          </div>
        </div>
      )}
    </div>
  )
}