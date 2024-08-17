import express from 'express'
import cors from 'cors'
import middleware from './utils/middleware'

const app = express()

app.use(express.json())
app.use(cors())

// Middleware
app.use(middleware.unknownEndPoint)

export default app