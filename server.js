import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express'
import productRouter from './Routers/product.js'
import userRouter from './Routers/User.js'
import cartRouter from './Routers/cart.js'
import addressRouter from './Routers/address.js'
import paymentRouter from './Routers/payment.js'
import cors from 'cors'


const app = express();

app.use(bodyParser.json())

//! Access the cors (http://localhost:5173' has been blocked by CORS policy)
app.use(cors({
    origin:true,
    methods:[ "GET","POST","PUT","DELETE"],
    credentials:true
  })) 

//! home Testing route
app.get('/', (req,res)=>res.json({message: "This is home route"}))

//! User ROuter
app.use('/api/user', userRouter)

//! Product Router
app.use('/api/product', productRouter)

//! Cart Router
app.use('/api/cart', cartRouter)

//! Address Router
app.use('/api/address', addressRouter)

//! Payment Router
app.use('/api/payment',paymentRouter)

mongoose.connect(
    "mongodb+srv://abhaychaurasia1082003:bsvXkyPwAw1dBDVa@cluster0.va0b6.mongodb.net/",{
        dbName: "MERN_E_EOMMERCE_API"
    }
).then(()=> console.log("MongoDb connected Successfully...!")).catch((error)=> console.log(error))

const port = 5000

app.listen(port, ()=>console.log(`server is running on port ${port}`))
