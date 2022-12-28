import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import authRouter from './authRouter.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import router from './router.js'
import aRouter from './routers/index.js'

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static('static'))
app.use(fileUpload())

app.use('/api', router)
app.use('/api', aRouter)
app.use('/auth', authRouter)

app.use(errorMiddleware)

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startApp()
