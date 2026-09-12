import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

/**
 * Admin Login
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // 2. Find the admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // 3. Compare submitted password with stored hashed password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // 4. Verify JWT secret is configured
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('❌ [Auth Error]: JWT_SECRET is not configured in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    // 5. Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      jwtSecret,
      { expiresIn }
    );

    // 6. Return response without password or password hash
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
