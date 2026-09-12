import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token from Authorization header.
 * Expects format: Bearer <JWT_TOKEN>
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Token missing.',
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('❌ [Auth Middleware Error]: JWT_SECRET is not configured.');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error.',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

export default verifyToken;
