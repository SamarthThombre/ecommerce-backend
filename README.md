
**My E-Commerce App Backend**

This is the backend for a full-stack e-commerce application built using the MERN (MongoDB, Express.js, React, Node.js) stack.

**Getting Started**

1. Clone the repository:
   git clone https://github.com/SamarthThombre/ecommerce-backend.git
   cd ecommerce-backend

2. Install dependencies:
   npm install

3. Set up environment variables:
   Create a .env file in the root directory with the following:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

4. Run the server:
   npm run dev

**Folder Structure**

controllers/       - Business logic for each route
models/            - Mongoose schemas and models
routes/            - API route handlers
middleware/        - Custom middleware (auth, error handling, etc.)
utils/             - Helper functions (e.g., token generation)
uploads/           - Local file uploads if used
config/            - Cloudinary and database setup
server.js          - Entry point for the application

**Main Features**

- User authentication with JWT
- Product listing and management
- Cart management
- Order creation and tracking
- Admin panel routes (add/update/delete products)
- Cloudinary integration for image uploads
- Secure routes with role-based access
- MongoDB Atlas for cloud database

**API Endpoints Sample**

POST   /api/users/register       Register a new user
POST   /api/users/login          Login and get token
GET    /api/products             Get all products
GET    /api/products/:id         Get single product
POST   /api/cart                 Add item to cart
DELETE /api/cart/:id             Remove item from cart
POST   /api/orders               Place a new order
GET    /api/orders/myorders      Get logged-in user's orders

**Dependencies**

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs
- cors
- cloudinary
- multer
- cookie-parser
- express-async-handler


