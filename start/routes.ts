/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import PersonController from '#controllers/person_controller'
import ReportController from '#controllers/report_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Auth
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

// CRUD personas (protegido)
router
  .get('/persons', [PersonController, 'index'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .post('/persons', [PersonController, 'store'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .get('/persons/:id', [PersonController, 'show'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .put('/persons/:id', [PersonController, 'update'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .delete('/persons/:id', [PersonController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

// Reportes (protegido)
router
  .get('/reports/gender', [ReportController, 'gender'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .get('/reports/age', [ReportController, 'age'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .get('/reports/gender-age', [ReportController, 'genderAge'])
  .use(middleware.auth({ guards: ['api'] }))
