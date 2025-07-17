import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/db.js'; 
import uploadRouter from './routes/uploadRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 5000

//testing server
app.get('/', (req, res) => {
  res.send('server is working')
})

//connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());


// Use the user routes
app.use('/api/user', userRouter);

// upload routes
app.use('/api/upload', uploadRouter);

//product routes
app.use('/api/product', productRoutes)

// Start the server
app.listen(port, () => {
  console.log(`[server] Example app listening on port ${port} `)
  console.log( '[server] http://localhost:'+ process.env.PORT)
})

