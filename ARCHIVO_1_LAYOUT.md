# 📄 ARCHIVO 1: src/app/layout.tsx

Crea el archivo `src/app/layout.tsx` y copia este código:

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '1SOLUTION - Sistema Punto de Venta Lavadero',
  description: 'Sistema completo de punto de venta para lavadero de autos - Paraguay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-gray-50">
        {children}
      </body>
    </html>
  )
}
```

# 📄 ARCHIVO 2: src/app/globals.css

Crea el archivo `src/app/globals.css` y copia este código:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Estilos específicos 1SOLUTION */
.dashboard-card {
  @apply bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow;
}

.primary-button {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors;
}

.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500;
}

.alert-critical {
  @apply bg-red-50 border-red-500 text-red-800 border-l-4 rounded-lg p-4;
}

.alert-warning {
  @apply bg-yellow-50 border-yellow-500 text-yellow-800 border-l-4 rounded-lg p-4;
}
```

# 📄 ARCHIVO 3: src/components/DashboardLayout.tsx

Crea el archivo `src/components/DashboardLayout.tsx` y copia este código:

```typescript
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
```