import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class UpdatePassword extends BaseCommand {
  static commandName = 'update:password'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "UpdatePassword"')
  }
}