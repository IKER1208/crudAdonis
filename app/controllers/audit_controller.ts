import type { HttpContext } from '@adonisjs/core/http'
import Log from '#database/MongoDB/models/log'

export default class AuditController {
  async index({ response }: HttpContext) {
    try {
      const logs = await Log.find().sort({ fecha: -1 }).limit(100)
      return response.ok(logs)
    } catch (error) {
      return response.internalServerError({ message: 'Error al obtener auditorías', error })
    }
  }
} 