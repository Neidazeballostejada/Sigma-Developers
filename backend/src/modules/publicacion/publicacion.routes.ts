import { Router } from 'express'
import { createProperty, cancelProperty } from '../publicacion/publicacion.controller.js'
import { propertyValidationRules } from '../publicacion/publicacion.validator.js'
import { requireAuth } from '../../middleware/auth.middleware.js'
//import { verifyToken } from '../middleware/auth.middleware.js'

const router = Router()

//router.post('/properties', propertyValidationRules, createProperty)
//router.post('/properties/cancel', cancelProperty)
router.post('/properties', requireAuth, propertyValidationRules, createProperty)
router.post('/properties/cancel', cancelProperty)

export default router