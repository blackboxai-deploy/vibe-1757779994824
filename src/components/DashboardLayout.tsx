"use client"

import React from 'react'
import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="lg:pl-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}