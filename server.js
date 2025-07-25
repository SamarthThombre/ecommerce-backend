import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/db.js'; 
import uploadRouter from './routes/uploadRoutes.js'
import productRoutes from './routes/productRoutes.js'
import OrderRouter from './routes/orderRoutes.js'
import cors from 'cors'

dotenv.config();
const app = express()
const port = process.env.PORT || 5000

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow credentials if needed
}));

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

//Order routes
app.use('/api/orders', OrderRouter);

// Start the server
app.listen(port, () => {
  console.log(`[server] Example app listening on port ${port} `)
  console.log( '[server] http://localhost:'+ process.env.PORT)
})

