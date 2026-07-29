import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../database/models/user.model";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  public async register(data: RegisterData) {
    const name = data.name?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;

    if (!name || !email || !password) {
      throw new Error("Name, email and password are required.");
    }

    if (password.length < 6) {
      throw new Error("Password must contain at least 6 characters.");
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: "User registered successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  public async login(data: LoginData) {
    const email = data.email?.trim().toLowerCase();
    const password = data.password;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "password", "role", "isActive"],
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    console.log("User from database:", user.get({ plain: true }));

    console.log("Password field exists:", Boolean(user.password));

    if (user.isActive === false) {
      throw new Error("Your account is inactive.");
    }

    if (!user.password) {
      throw new Error("Password hash is missing for this account.");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    console.log("Password matches:", passwordMatches);

    if (!passwordMatches) {
      throw new Error("Invalid email or password.");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    return {
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }
}

export const authService = new AuthService();
