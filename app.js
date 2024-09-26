require('dotenv').config()
require('express-async-errors')
//async errors
const  express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productRouter = require('./routes/products')
//middleware
app.use(express.json())

//routes

app.get('/',(req,res)=>{
  res.send('<h1>Store API</h1> <a href="/api/v1/products">products</a>')
})

app.use('/api/v1/products',productRouter)

//products route

app.use(notFound)
app.use(errorMiddleware)
const port = process.env.PORT || 3000
const start =  async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`server is listening on ${port}`)
    )
  } catch (error) {
    console.log('error occured',error);
  }
}


start()

