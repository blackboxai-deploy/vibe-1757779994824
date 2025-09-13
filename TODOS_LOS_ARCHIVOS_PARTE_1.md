# 📦 TODOS LOS ARCHIVOS 1SOLUTION - PARTE 1

## 📄 ARCHIVO 7: src/components/ventas/VentasForm.tsx - CON BÚSQUEDA CLIENTES

```typescript
"use client"

import React, { useState } from 'react'

interface VentaItem {
  id: string
  type: 'servicio' | 'producto'
  name: string
  vehicleType?: string
  quantity: number
  price: number
  total: number
}

const servicios = [
  { id: 'lavado-basico', name: 'Lavado Básico', prices: { Auto: 25000, SUV: 35000, Camioneta: 40000, Moto: 15000, Furgoneta: 45000 } },
  { id: 'lavado-full', name: 'Lavado Full Detail', prices: { Auto: 35000, SUV: 45000, Camioneta: 50000, Moto: 25000, Furgoneta: 55000 } },
  { id: 'pulido', name: 'Pulido', prices: { Auto: 60000, SUV: 80000, Camioneta: 90000, Moto: 40000, Furgoneta: 95000 } },
  { id: 'inyeccion', name: 'Inyección', prices: { Auto: 40000, SUV: 50000, Camioneta: 55000, Moto: 30000, Furgoneta: 60000 } },
  { id: 'aspirado', name: 'Aspirado', prices: { Auto: 15000, SUV: 20000, Camioneta: 25000, Moto: 10000, Furgoneta: 25000 } },
  { id: 'anti-hongos', name: 'Tratamiento Anti-Hongos', prices: { Auto: 40000, SUV: 50000, Camioneta: 55000, Moto: 30000, Furgoneta: 60000 } },
  { id: 'paquete-turismo', name: 'Paquete Turismo', prices: { Auto: 60000, SUV: 75000, Camioneta: 85000, Moto: 45000, Furgoneta: 90000 } }
]

const productos = [
  { id: 'shampoo', name: 'Shampoo Auto', price: 25000 },
  { id: 'cera', name: 'Cera Líquida', price: 35000 },
  { id: 'aromatizante', name: 'Aromatizante', price: 15000 },
  { id: 'panos', name: 'Paños Microfibra', price: 20000 }
]

// BASE DE DATOS DE CLIENTES
const clientesDB = [
  {
    id: 'CLI001',
    nombre: 'María González',
    cedula: '1.234.567',
    telefono: '0981-123456',
    email: 'maria.gonzalez@email.com',
    regimenTurismo: false
  },
  {
    id: 'CLI002',
    nombre: 'Carlos Mendoza',
    cedula: '2.345.678',
    telefono: '0985-234567',
    email: 'carlos.mendoza@email.com',
    regimenTurismo: false
  },
  {
    id: 'CLI003',
    nombre: 'Ana Rodríguez',
    cedula: '3.456.789',
    telefono: '0976-345678',
    email: 'ana.rodriguez@turismo.gov.py',
    regimenTurismo: true
  },
  {
    id: 'CLI004',
    nombre: 'Roberto Silva',
    cedula: '4.567.890',
    telefono: '0971-456789',
    regimenTurismo: false
  },
  {
    id: 'CLI005',
    nombre: 'Lucia Benítez',
    cedula: '5.678.901',
    telefono: '0982-567890',
    regimenTurismo: true
  },
  {
    id: 'CLI006',
    nombre: 'Pedro Ramírez',
    cedula: '6.789.012',
    telefono: '0983-678901',
    regimenTurismo: false
  },
  {
    id: 'CLI007',
    nombre: 'Carmen Torres',
    cedula: '7.890.123',
    telefono: '0984-789012',
    email: 'carmen.torres@hotel.com.py',
    regimenTurismo: true
  }
]

const vehicleTypes = ['Auto', 'SUV', 'Camioneta', 'Moto', 'Furgoneta']
const paymentMethods = ['Efectivo', 'Tarjeta', 'Transferencia', 'Crédito', 'Saldo']

export function VentasForm() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchClient, setSearchClient] = useState('')
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showClientResults, setShowClientResults] = useState(false)
  const [items, setItems] = useState<VentaItem[]>([])
  const [regimenTurismo, setRegimenTurismo] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('Efectivo')
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [pendingService, setPendingService] = useState<any>(null)
  const [showFacturaModal, setShowFacturaModal] = useState(false)
  const [ventaCompletada, setVentaCompletada] = useState<any>(null)

  const filteredItems = [...servicios, ...productos].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Filtrar clientes para búsqueda
  const filteredClients = clientesDB.filter(client =>
    client.nombre.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.cedula.includes(searchClient) ||
    (client.telefono && client.telefono.includes(searchClient))
  )

  const selectClient = (client: any) => {
    setSelectedClient(client)
    setRegimenTurismo(client.regimenTurismo) // Auto-detectar régimen turismo
    setSearchClient(client.nombre)
    setShowClientResults(false)
  }

  const clearClient = () => {
    setSelectedClient(null)
    setSearchClient('')
    setRegimenTurismo(false)
    setShowClientResults(false)
  }

  const addService = (service: any, vehicleType: string) => {
    const price = service.prices[vehicleType]
    const newItem: VentaItem = {
      id: `${service.id}-${Date.now()}`,
      type: 'servicio',
      name: service.name,
      vehicleType,
      quantity: 1,
      price,
      total: price
    }
    setItems([...items, newItem])
    setShowVehicleModal(false)
    setPendingService(null)
    setSearchTerm('')
  }

  const addProduct = (product: any) => {
    const newItem: VentaItem = {
      id: `${product.id}-${Date.now()}`,
      type: 'producto',
      name: product.name,
      quantity: 1,
      price: product.price,
      total: product.price
    }
    setItems([...items, newItem])
    setSearchTerm('')
  }

  const handleItemClick = (item: any) => {
    if (servicios.find(s => s.id === item.id)) {
      setPendingService(item)
      setShowVehicleModal(true)
    } else {
      addProduct(item)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const iva = regimenTurismo ? 0 : Math.round(subtotal * 0.1)
  const total = subtotal + iva

  const procesarVenta = (accion: 'guardar' | 'imprimir' | 'imprimir-guardar') => {
    if (items.length === 0) {
      alert('Debe agregar al menos un item a la venta')
      return
    }

    if (!selectedClient) {
      alert('Debe seleccionar un cliente para la venta')
      return
    }
    
    // Crear datos de la venta
    const ventaData = {
      numeroFactura: `FAC-${String(Date.now()).slice(-6)}`,
      fecha: new Date().toLocaleDateString('es-PY'),
      hora: new Date().toLocaleTimeString('es-PY'),
      cliente: selectedClient,
      items,
      subtotal,
      iva,
      total,
      metodoPago: paymentMethod,
      regimenTurismo,
      accion
    }

    setVentaCompletada(ventaData)
    setShowFacturaModal(true)
  }

  const finalizarVenta = () => {
    // Simular incremento de timbrado
    alert('✅ Venta procesada exitosamente!\n\n📄 Timbrado actualizado\n📊 Inventario actualizado\n💾 Datos guardados')
    
    // Limpiar formulario
    setItems([])
    setSelectedClient(null)
    setSearchClient('')
    setSearchTerm('')
    setRegimenTurismo(false)
    setPaymentMethod('Efectivo')
    setShowFacturaModal(false)
    setVentaCompletada(null)
  }

  return (
    <div className="space-y-6">
      {/* Búsqueda de productos/servicios y clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar Productos / Servicios
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escriba para buscar servicios o productos..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          
          {searchTerm && (
            <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      {'prices' in item ? 'Servicio' : `Gs. ${item.price.toLocaleString('es-PY')}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar Cliente *
          </label>
          <input
            type="text"
            value={searchClient}
            onChange={(e) => {
              setSearchClient(e.target.value)
              setShowClientResults(e.target.value.length > 0)
            }}
            placeholder="Buscar por nombre, cédula o teléfono..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          
          {/* Cliente seleccionado */}
          {selectedClient && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900">{selectedClient.nombre}</p>
                  <p className="text-sm text-blue-700">CI: {selectedClient.cedula}</p>
                  {selectedClient.regimenTurismo && (
                    <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Régimen Turismo
                    </span>
                  )}
                </div>
                <button
                  onClick={clearClient}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Cambiar
                </button>
              </div>
            </div>
          )}
          
          {/* Resultados de búsqueda */}
          {showClientResults && searchClient && !selectedClient && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredClients.length > 0 ? (
                <>
                  {filteredClients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => selectClient(client)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{client.nombre}</p>
                          <p className="text-sm text-gray-600">CI: {client.cedula} | Tel: {client.telefono}</p>
                        </div>
                        {client.regimenTurismo && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Turismo
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={() => {
                        setShowClientResults(false)
                        alert('Redirigir a crear nuevo cliente (funcionalidad completa en C# WPF)')
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Crear nuevo cliente con este nombre
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 py-3 text-center text-gray-500">
                  <p className="text-sm">No se encontraron clientes</p>
                  <button
                    onClick={() => {
                      setShowClientResults(false)
                      alert('Redirigir a crear nuevo cliente (funcionalidad completa en C# WPF)')
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Crear nuevo cliente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Régimen de turismo */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="regimen-turismo"
          checked={regimenTurismo}
          onChange={(e) => setRegimenTurismo(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="regimen-turismo" className="text-sm font-medium text-gray-700">
          Régimen de Turismo (IVA 0%)
        </label>
      </div>

      {/* Items de la venta */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Items de la Venta</h3>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay items agregados. Use la búsqueda para agregar productos o servicios.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  {item.vehicleType && (
                    <p className="text-sm text-gray-500">{item.vehicleType}</p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold">Gs. {item.total.toLocaleString('es-PY')}</p>
                    <p className="text-sm text-gray-500">Gs. {item.price.toLocaleString('es-PY')} c/u</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumen y pago */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (10%):</span>
                <span>{regimenTurismo ? 'Gs. 0 (Turismo)' : `Gs. ${iva.toLocaleString('es-PY')}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">Gs. {total.toLocaleString('es-PY')}</span>
                </div>
              </div>
            </div>
            
            {/* Botones de acción con opciones de impresión */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => procesarVenta('imprimir-guardar')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>🖨️</span>
                <span>Imprimir y Guardar</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => procesarVenta('imprimir')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🖨️</span>
                  <span>Solo Imprimir</span>
                </button>
                <button
                  onClick={() => procesarVenta('guardar')}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>💾</span>
                  <span>Solo Guardar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal selección de vehículo */}
      {showVehicleModal && pendingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seleccionar Tipo de Vehículo
            </h3>
            <p className="text-gray-600 mb-4">
              Servicio: <strong>{pendingService.name}</strong>
            </p>
            <div className="space-y-2">
              {vehicleTypes.map((vehicleType) => (
                <button
                  key={vehicleType}
                  onClick={() => addService(pendingService, vehicleType)}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>{vehicleType}</span>
                  <span className="font-semibold text-green-600">
                    Gs. {pendingService.prices[vehicleType].toLocaleString('es-PY')}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowVehicleModal(false)
                setPendingService(null)
              }}
              className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Factura - Opciones de Impresión */}
      {showFacturaModal && ventaCompletada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    🧾 Factura Generada - {ventaCompletada.numeroFactura}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Cliente: {ventaCompletada.cliente.nombre} | Total: Gs. {ventaCompletada.total.toLocaleString('es-PY')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Acción: {ventaCompletada.accion}</p>
                  <p className="text-xs text-gray-400">{ventaCompletada.fecha} {ventaCompletada.hora}</p>
                </div>
              </div>
            </div>

            {/* Vista previa de la factura */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa de la Factura</h4>
              
              {/* Formato de factura simulada */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-inner">
                {/* Header de factura */}
                <div className="flex items-start justify-between border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">1S</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">AutoLavado Premium</h2>
                      <div className="text-sm text-gray-600 space-y-1 mt-1">
                        <p>RUC: 80123456-7 | Timbrado: T-12345678</p>
                        <p>Av. España 1234, Asunción, Paraguay</p>
                        <p>Tel: 021-123456 | contacto@autolavado.com.py</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded">
                      <p className="font-bold">FACTURA</p>
                    </div>
                    <div className="text-sm mt-2 space-y-1">
                      <p><strong>Nº:</strong> {ventaCompletada.numeroFactura}</p>
                      <p><strong>Fecha:</strong> {ventaCompletada.fecha}</p>
                      <p><strong>Hora:</strong> {ventaCompletada.hora}</p>
                    </div>
                  </div>
                </div>

                {/* Cliente */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p><strong>Cliente:</strong> {ventaCompletada.cliente.nombre}</p>
                    <p><strong>C.I.:</strong> {ventaCompletada.cliente.cedula}</p>
                    {ventaCompletada.cliente.telefono && (
                      <p><strong>Tel:</strong> {ventaCompletada.cliente.telefono}</p>
                    )}
                  </div>
                  <div>
                    <p><strong>Método de Pago:</strong> {ventaCompletada.metodoPago}</p>
                    {ventaCompletada.regimenTurismo && (
                      <p className="text-purple-600 font-medium">
                        <strong>Régimen:</strong> Turismo (IVA 0%)
                      </p>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm">Descripción</th>
                        <th className="border border-gray-300 px-3 py-2 text-center text-sm">Cant.</th>
                        <th className="border border-gray-300 px-3 py-2 text-right text-sm">Precio</th>
                        <th className="border border-gray-300 px-3 py-2 text-right text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventaCompletada.items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-3 py-2 text-sm">
                            {item.name}
                            {item.vehicleType && (
                              <span className="text-gray-500 ml-1">({item.vehicleType})</span>
                            )}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center text-sm">{item.quantity}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                            Gs. {item.price.toLocaleString('es-PY')}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right text-sm font-medium">
                            Gs. {item.total.toLocaleString('es-PY')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totales */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>Gs. {ventaCompletada.subtotal.toLocaleString('es-PY')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (10%):</span>
                      <span>{ventaCompletada.regimenTurismo ? 'Gs. 0 (Turismo)' : `Gs. ${ventaCompletada.iva.toLocaleString('es-PY')}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                      <span>TOTAL:</span>
                      <span className="text-green-600">Gs. {ventaCompletada.total.toLocaleString('es-PY')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de la acción */}
              <div className={`p-4 rounded-lg mb-6 ${
                ventaCompletada.accion === 'imprimir-guardar' ? 'bg-blue-50 border border-blue-200' :
                ventaCompletada.accion === 'imprimir' ? 'bg-green-50 border border-green-200' :
                'bg-gray-50 border border-gray-200'
              }`}>
                <h4 className="font-semibold mb-2">
                  {ventaCompletada.accion === 'imprimir-guardar' ? '🖨️ Se imprimirá Y guardará la venta' :
                   ventaCompletada.accion === 'imprimir' ? '🖨️ Solo se imprimirá (no se guardará)' :
                   '💾 Solo se guardará (no se imprimirá)'}
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  {ventaCompletada.accion !== 'guardar' && (
                    <p>• La factura se enviará a la impresora configurada</p>
                  )}
                  {ventaCompletada.accion !== 'imprimir' && (
                    <>
                      <p>• Se guardará en el historial de ventas</p>
                      <p>• Se descontará automáticamente del inventario</p>
                      <p>• Se actualizará el contador de timbrado DGII</p>
                      <p>• Se actualizará el historial del cliente</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Botones de acción del modal */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowFacturaModal(false)
                  setVentaCompletada(null)
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancelar
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => alert('Vista previa de impresión (funcionalidad completa en C# WPF)')}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                >
                  👁️ Vista Previa
                </button>
                <button
                  onClick={finalizarVenta}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  ✅ Confirmar y Procesar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```