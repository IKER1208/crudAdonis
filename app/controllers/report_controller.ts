import type { HttpContext } from '@adonisjs/core/http'
import Person from '#models/person'

export default class ReportController {
  // Reporte 1: hombres y mujeres
  async gender({ response }: HttpContext) {
    const hombres = await Person.query().where('sexo', 'M').count('* as total')
    const mujeres = await Person.query().where('sexo', 'F').count('* as total')
    return response.ok({ hombres: Number(hombres[0].$extras.total), mujeres: Number(mujeres[0].$extras.total) })
  }

  // Reporte 2: menores y mayores (menor de 18)
  async age({ response }: HttpContext) {
    const menores = await Person.query().where('edad', '<', 18).count('* as total')
    const mayores = await Person.query().where('edad', '>=', 18).count('* as total')
    return response.ok({ menores: Number(menores[0].$extras.total), mayores: Number(mayores[0].$extras.total) })
  }

  // Reporte 3: hombres/mujeres menores/mayores
  async genderAge({ response }: HttpContext) {
    const hombresMenores = await Person.query().where('sexo', 'M').where('edad', '<', 18).count('* as total')
    const hombresMayores = await Person.query().where('sexo', 'M').where('edad', '>=', 18).count('* as total')
    const mujeresMenores = await Person.query().where('sexo', 'F').where('edad', '<', 18).count('* as total')
    const mujeresMayores = await Person.query().where('sexo', 'F').where('edad', '>=', 18).count('* as total')
    return response.ok({
      hombresMenores: Number(hombresMenores[0].$extras.total),
      hombresMayores: Number(hombresMayores[0].$extras.total),
      mujeresMenores: Number(mujeresMenores[0].$extras.total),
      mujeresMayores: Number(mujeresMayores[0].$extras.total),
    })
  }
} 