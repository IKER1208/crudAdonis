/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// auth
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
})

// personas
router.group(() => {
  router.get('/persons', '#controllers/person_controller.index')
  router.post('/persons', '#controllers/person_controller.store')
  router.get('/persons/:id', '#controllers/person_controller.show')
  router.put('/persons/:id', '#controllers/person_controller.update')
  router.delete('/persons/:id', '#controllers/person_controller.destroy')
}).use([middleware.auth({ guards: ['api'] })])

//reportes
router.group(() => {
  router.get('/reports/gender', '#controllers/report_controller.gender')
  router.get('/reports/age', '#controllers/report_controller.age')
  router.get('/reports/gender-age', '#controllers/report_controller.genderAge')
}).use([middleware.auth({ guards: ['api'] })])
