import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log('[protect] Auth Middleware Initialized');
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB and attach to req.user
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('[protect] User not found');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('[protect] Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('[protect] Not authorized, no token');
  }
});

// Restrict to admins
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('[protect] Access denied. Admins only.');
  }
};
