'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type LoginResponse = {
  message?: string
  token?: string
  user?: {
    id: number
    correo: string
    nombre?: string
    apellido?: string
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ correo?: string; password?: string }>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = correo.length > 0 && password.length > 0 && !errors.correo && !errors.password

  const validate = (field: string, value: string) => {
    const newErrors = { ...errors }

    if (field === 'correo') {
      if (!value) {
        newErrors.correo = 'El correo es obligatorio'
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.correo = 'Formato de correo inválido'
      } else {
        delete newErrors.correo
      }
    }

    if (field === 'password') {
      if (!value) {
        newErrors.password = 'La contraseña es obligatoria'
      } else if (value.length > 16) {
        newErrors.password = 'La contraseña no puede tener más de 16 caracteres'
      } else {
        delete newErrors.password
      }
    }

    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedCorreo = correo.trim().toLowerCase()
    const trimmedPassword = password.trim()

    const newErrors: { correo?: string; password?: string } = {}

    if (!trimmedCorreo) {
      newErrors.correo = 'El correo es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(trimmedCorreo)) {
      newErrors.correo = 'Formato de correo inválido'
    }

    if (!trimmedPassword) {
      newErrors.password = 'La contraseña es obligatoria'
    }

    setErrors(newErrors)
    setErrorMessage('')
    setSuccessMessage('')

    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: trimmedCorreo,
          password: trimmedPassword
        })
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        setPassword('')
        setErrorMessage(data.message || 'Error al iniciar sesión')
        return
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      const userName =
        data.user?.nombre && data.user?.apellido
          ? `${data.user.nombre} ${data.user.apellido}`
          : (data.user?.correo ?? trimmedCorreo)

      localStorage.setItem(
        'propbol_user',
        JSON.stringify({
          name: userName,
          email: data.user?.correo ?? trimmedCorreo
        })
      )
      localStorage.setItem('propbol_session_expires', String(Date.now() + 60 * 60 * 1000))

      setSuccessMessage(data.message || 'Inicio de sesión exitoso')

      window.dispatchEvent(new Event('propbol:login'))
      window.dispatchEvent  