import express from 'express'
import confessionController from '../controllers/confession.controller'

const confessionRouter = express.Router()

confessionRouter.route('/')
  .post(confessionController.confess)
  .delete(confessionController.deleteConfession)

confessionRouter.get('/:id', confessionController.getConfessions)

export default confessionRouter