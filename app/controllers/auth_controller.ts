import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const registerSchema = vine.object({
      fullName: vine.string()
        .minLength(1)
        .maxLength(100)
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),
      email: vine.string().email(),
      password: vine.string().minLength(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/),
    })
    try {
      const data = await vine.validate({
        schema: registerSchema,
        data: request.only(['fullName', 'email', 'password']),
      })
      const user = await User.create(data)
      return response.created({ user })
    } catch (error) {
      return response.badRequest({ errors: error.messages || error.message })
    }
  }

  async login({ request, auth, response }: HttpContext) {
    const loginSchema = vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8),
    })
    try {
      const { email, password } = await vine.validate({
        schema: loginSchema,
        data: request.only(['email', 'password']),
      })
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('api').createToken(user)
      return response.ok(token)
    } catch (error) {
      return response.badRequest({ errors: error.messages || error.message })
    }
  }
} 