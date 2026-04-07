'use client'

import React from 'react'
import { useRouter } from 'next/navigation' // Importante para la redirección

// 1. Agregamos isOpen a las propiedades permitidas
interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanModal({ isOpen, onClose }: PlanModalProps) {
  const router = useRouter();

  // 2. Si isOpen es falso, no dibujamos nada en la pantalla
  if (!isOpen) return null;

  // 3. Función para redirigir al pago de la HU3
  const handleSelectPlan = (planId: number) => {
    router.push(`/pago?planId=${planId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm">
      
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
        
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-stone-400 transition-colors hover:text-red-500"
          aria-label="Cerrar modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900">Alcanzaste tu límite gratuito</h2>
          <p className="mt-2 text-stone-600">Para seguir publicando, elige uno de nuestros planes pensados para ti.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6 text-center opacity-70">
            <h3 className="text-xl font-bold text-stone-900">Básico</h3>
            <p className="mt-4 text-3xl font-bold text-stone-900">Gratis</p>
            <p className="mt-2 text-sm text-stone-500">2 publicaciones máximas</p>
            <button disabled className="mt-6 w-full rounded-lg bg-stone-300 py-2 font-semibold text-stone-600 cursor-not-allowed">
              Agotado
            </button>
          </div>

          <div className="relative rounded-xl border-2 border-amber-500 bg-white p-6 text-center shadow-lg transform transition hover:scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white uppercase">
              Recomendado
            </div>
            <h3 className="text-xl font-bold text-stone-900">Pro</h3>
            <p className="mt-4 text-3xl font-bold text-amber-600">Bs. 50<span className="text-lg text-stone-500">/mes</span></p>
            <p className="mt-2 text-sm text-stone-600">Hasta 10 publicaciones</p>
            {/* 4. Conectamos el botón con el ID del plan 2 */}
            <button 
              onClick={() => handleSelectPlan(2)}
              className="mt-6 w-full rounded-lg bg-amber-500 py-2 font-semibold text-white transition hover:bg-amber-600"
            >
              Elegir Plan Pro
            </button>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm transform transition hover:scale-105">
            <h3 className="text-xl font-bold text-stone-900">Premium</h3>
            <p className="mt-4 text-3xl font-bold text-stone-900">Bs. 120<span className="text-lg text-stone-500">/mes</span></p>
            <p className="mt-2 text-sm text-stone-600">Publicaciones ilimitadas</p>
            {/* 4. Conectamos el botón con el ID del plan 3 */}
            <button 
              onClick={() => handleSelectPlan(3)}
              className="mt-6 w-full rounded-lg border border-amber-500 py-2 font-semibold text-amber-600 transition hover:bg-amber-50"
            >
              Elegir Premium
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}