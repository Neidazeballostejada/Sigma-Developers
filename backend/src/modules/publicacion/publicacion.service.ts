import { prisma } from '../../db.js'
import { publicacionesRepository } from '../publicaciones/publicaciones.repository.js'

const createProperty = async (data: any, userId: number) => {
  const count = await publicacionesRepository.countByUser(userId)

  console.log('📊 Publicaciones actuales del usuario:', count)

  if (count >= 2) {
    throw new Error('LIMIT_REACHED')
  }

  const result = await prisma.$transaction(async (tx) => {
    const inmueble = await tx.inmueble.create({
      data: {
        titulo: data.titulo,
        tipoAccion: data.tipoAccion,
        categoria: data.categoria,
        precio: data.precio,
        superficieM2: data.superficieM2,
        nroCuartos: data.nroCuartos,
        nroBanos: data.nroBanos,
        descripcion: data.descripcion,
        propietarioId: userId
      }
    })

    const publicacion = await tx.publicacion.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        usuarioId: userId,
        inmuebleId: inmueble.id
      }
    })

    await tx.$executeRaw`
      INSERT INTO ubicacion_inmueble ("inmuebleId", "direccion", "latitud", "longitud")
      VALUES (
        ${inmueble.id},
        ${data.direccion},
        ${data.latitud ?? 0},
        ${data.longitud ?? 0}
      )
    `

    return { inmueble, publicacion }
  })

  return result
}

export default { createProperty }