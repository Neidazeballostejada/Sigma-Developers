import type { Response } from 'express'
import { validationResult } from 'express-validator'
import propertyService from '../publicacion/publicacion.service.js'
import type { AuthenticatedRequest } from '../../middleware/auth.middleware.js'

export const createProperty = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array().map((error: any) => ({
        campo: error.path,
        mensaje: error.msg
      }))
    })
  }

  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({
        message: 'NOT_AUTHENTICATED',
        mensaje: 'Usuario no autenticado'
      })
    }

    const property = await propertyService.createProperty(req.body, userId)

    return res.status(201).json({
      mensaje: 'Publicación registrada correctamente',
      property
    })
  } catch (error: unknown) {
    console.error('Error al registrar la propiedad:', error)

    if (error instanceof Error && error.message === 'LIMIT_REACHED') {
      return res.status(403).json({
        message: 'LIMIT_REACHED',
        mensaje: 'Has alcanzado el límite de publicaciones gratuitas.'
      })
    }

    return res.status(500).json({
      mensaje: 'Error al registrar la propiedad'
    })
  }
}

export const cancelProperty = async (_req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({
    mensaje: 'Operación cancelada, regresando a la pantalla anterior'
  })
}