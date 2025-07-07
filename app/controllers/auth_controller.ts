import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    const user = await User.create(data)
    return response.created({ user })
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)
    return response.ok(token)
  }
} 