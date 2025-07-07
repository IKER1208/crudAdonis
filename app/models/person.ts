import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Person extends BaseModel {
  public static table = 'persons'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare edad: number

  @column()
  declare sexo: 'M' | 'F'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null
}