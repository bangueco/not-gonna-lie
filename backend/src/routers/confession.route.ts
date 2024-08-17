import express from 'express'
import confessionController from '../controllers/confession.controller'

const confessionRouter = express.Router()

confessionRouter.route('/')
  .post(confessionController.confess)
  .delete(confessionController.deleteConfession)

export default confessionRouter