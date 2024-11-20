import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { AppError } from '../middlewares/error.middleware';
import { FilterUserData } from '../utils/fiilterUserData';

export class AuthService {
  private static generateToken(
    user: IUser,
    type: 'access' | 'refresh' = 'access'
  ): string {
    const secret =
      type === 'access'
        ? process.env.JWT_SECRET!
        : process.env.JWT_REFRESH_SECRET!;

    const expiresIn =
      type === 'access'
        ? process.env.JWT_EXPIRE
        : process.env.JWT_REFRESH_EXPIRE;

    return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });
  }

  private static async checkExistingUser(email: string): Promise<void> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }
  }

  static async register(userData: {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin' | 'manager';
  }) {
    // Check if user already exists
    await this.checkExistingUser(userData.email);

    // Create user with default role if not specified
    const user = await User.create({
      ...userData,
      role: userData.role || 'user'
    });

    // Generate tokens
    const accessToken = this.generateToken(user, 'access');
    const refreshToken = this.generateToken(user, 'refresh');

    // Filter sensitive data before sending response
    const filteredUser = FilterUserData.exclude(user.toObject(), ['password']);

    return {
      user: filteredUser,
      tokens: {
        accessToken,
        refreshToken
      }
    };
  }

  static async login(email: string, password: string) {
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate tokens
    const accessToken = this.generateToken(user, 'access');
    const refreshToken = this.generateToken(user, 'refresh');

    // Filter sensitive data before sending response
    const filteredUser = FilterUserData.exclude(user.toObject(), ['password']);

    return {
      user: filteredUser,
      tokens: {
        accessToken,
        refreshToken
      }
    };
  }

  static async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as jwt.JwtPayload;

      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new AppError('User not found', 401);
      }

      // Generate new tokens
      const newAccessToken = this.generateToken(user, 'access');
      const newRefreshToken = this.generateToken(user, 'refresh');

      return {
        tokens: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        }
      };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  static async getUserProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return FilterUserData.exclude(user.toObject(), ['password']);
  }

  static async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    if (!(await user.comparePassword(currentPassword))) {
      throw new AppError('Current password is incorrect', 401);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate new tokens
    const accessToken = this.generateToken(user, 'access');
    const refreshToken = this.generateToken(user, 'refresh');

    return {
      message: 'Password updated successfully',
      tokens: {
        accessToken,
        refreshToken
      }
    };
  }
}
