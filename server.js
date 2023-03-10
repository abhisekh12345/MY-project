import 'express-async-errors'
import express from "express"
import morgan from 'morgan'
import authenticateUser from './middleware/auth.js'



import{dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'


import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'



const app  = express()
const port = process.env.PORT || 5000


import dotenv from 'dotenv'
dotenv.config()


// middleWAre//
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

// db and authentication user//
import connectDB from "./dbfolder/connect.js"

// routes//
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'


/// morgan//
if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}


const __dirname = dirname(fileURLToPath(import.meta.url))


app.use(express.static(path.resolve(__dirname,'./client/build')))

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())




app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)


app.get('*',(req,res) => {
  res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const start = async() =>{
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,() => {
        console.log(`Serving in listening in port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()


