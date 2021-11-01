import { Router } from 'express'
import * as destinationsCtrl from '../controllers/destinations.js'
const router = Router()

/* GET users listing. */
router.get('/new', destinationsCtrl.new)

export {
  router
}