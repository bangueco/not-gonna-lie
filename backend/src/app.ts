import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import middleware from './utils/middleware'
import authRouter from './routers/auth.route'
import confessionRouter from './routers/confession.route'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/api/confession', confessionRouter)
app.use('/api/auth', authRouter)

// Middleware
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

export default app