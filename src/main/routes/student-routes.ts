import { Router } from 'express'
import StudentFacadeFactory from '../../modules/student/factories/student-facade-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/student', adaptRoute(StudentFacadeFactory, 'add'))
  router.get('/student', adaptRoute(StudentFacadeFactory, 'find'))
}
