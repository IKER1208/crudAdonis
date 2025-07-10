import type { HttpContext } from '@adonisjs/core/http'
import Person from '#models/person'
import { DateTime } from 'luxon'
import vine from '@vinejs/vine'
import Log from '#database/MongoDB/models/log'

export default class PersonController {
  async index({ response }: HttpContext) {
    const persons = await Person.query().whereNull('deleted_at')
    return response.ok(persons)
  }

  async store({ request, response, auth }: HttpContext) {
    const personSchema = vine.object({
      nombre: vine.string()
        .minLength(1)
        .maxLength(50)
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/), 
      edad: vine.number().min(0).max(120),
      sexo: vine.string().regex(/^[MF]$/), 
    })
    try {
      const data = await vine.validate({
        schema: personSchema,
        data: request.only(['nombre', 'edad', 'sexo']),
      })
      // Conversión explícita para el tipo 'sexo'
      const person = await Person.create({ ...data, sexo: data.sexo as 'M' | 'F' })
      // Registrar log
      await Log.create({
        usuario: auth.user?.email || 'desconocido',
        operacion: 'crear',
        sobre: person.id.toString(),
        nombrePersona: person.nombre
      })
      return response.created(person)
    } catch (error) {
      return response.badRequest({ errors: error.messages || error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const person = await Person.query().where('id', params.id).whereNull('deleted_at').firstOrFail()
      return response.ok(person)
    } catch {
      return response.notFound({ message: 'Persona no encontrada' })
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    const personSchema = vine.object({
      nombre: vine.string()
        .minLength(1)
        .maxLength(50)
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/), // Solo letras y espacios
      edad: vine.number().min(0).max(120),
      sexo: vine.string().regex(/^[MF]$/), // Solo 'M' o 'F'
    })
    try {
      const data = await vine.validate({
        schema: personSchema,
        data: request.only(['nombre', 'edad', 'sexo']),
      })
      const person = await Person.query().where('id', params.id).whereNull('deleted_at').firstOrFail()
      person.merge({ ...data, sexo: data.sexo as 'M' | 'F' })
      await person.save()
      // Registrar log
      await Log.create({
        usuario: auth.user?.email || 'desconocido',
        operacion: 'actualizar',
        sobre: person.id.toString(),
        nombrePersona: person.nombre
      })
      return response.ok(person)
    } catch (error) {
      return response.badRequest({ errors: error.messages || error.message })
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    const person = await Person.query().where('id', params.id).whereNull('deleted_at').firstOrFail()
    person.deletedAt = DateTime.now()
    await person.save()
    // Registrar log
    await Log.create({
      usuario: auth.user?.email || 'desconocido',
      operacion: 'eliminar',
      sobre: person.id.toString(),
      nombrePersona: person.nombre
    })
    return response.noContent()
  }
}
