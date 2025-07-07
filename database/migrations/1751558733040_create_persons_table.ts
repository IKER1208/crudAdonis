import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'persons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nombre').notNullable()
      table.integer('edad').notNullable()
      table.enum('sexo', ['M', 'F']).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable() // Soft delete
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
} 