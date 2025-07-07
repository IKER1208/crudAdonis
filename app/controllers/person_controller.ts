import type { HttpContext } from '@adonisjs/core/http'
import Person from '#models/person'
import { DateTime } from 'luxon'

export default class PersonController {
  async index({ response }: HttpContext) {
    const persons = await Person.query().whereNull('deleted_at')
    return response.ok(persons)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'edad', 'sexo'])
    // Validación básica
    if (!data.nombre || typeof data.nombre !== 'string' || data.nombre.length > 50) {
      return response.badRequest({ message: 'Nombre inválido' })
    }
    if (typeof data.edad !== 'number' || data.edad < 0 || data.edad > 120) {
      return response.badRequest({ message: 'Edad inválida' })
    }
    if (!['M', 'F'].includes(data.sexo)) {
      return response.badRequest({ message: 'Sexo inválido' })
    }
    const person = await Person.create(data)
    return response.created(person)
  }

  async show({ params, response }: HttpContext) {
    try {
      const person = await Person.query().where('id', params.id).whereNull('deleted_at').firstOrFail()
      return response.ok(person)
    } catch {
      return response.notFound({ message: 'Persona no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['nombre', 'edad', 'sexo'])
    // Validación básica
    if (!data.nombre || typeof data.nombre !== 'string' || data.nombre.length > 50) {
      return response.badRequest({ message: 'Nombre inválido' })
    }
    if (typeof data.edad !== 'number' || data.edad < 0 || data.edad > 120) {
      return response.badRequest({ message: 'Edad inválida' })
    }
    if (!['M', 'F'].includes(data.sexo)) {
      return response.badRequest({ message: 'Sexo inválido' })
    }
    const person = await Person.query().where('id', params.id).whereNull('deleted_at').firstOrFail()
    person.merge(data)
    await person.save()
    return response.ok(person)
  }

  async destroy({ params, response }: HttpContext) {
    const person = await Person.query().where('id', params.id).whereNull('deleted_at').firstOrFail()
    person.deletedAt = DateTime.now()
    await person.save()
    return response.noContent()
  }
}
