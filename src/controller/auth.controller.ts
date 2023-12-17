import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { Role, User } from "../entity";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService = new AuthService();
  private userService = new UserService();

  async register(request: Request, response: Response) {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = new User();
    user.email = request.body.email;
    user.username = request.body.username;
    user.password = hashedPassword;
    user.isActive = request.body.isActive;
    user.role = request.body.role;

    const isExistEmail = await this.userService.findByEmail(user.email);
    const isExistUsername = await this.userService.findByUsername(
      user.username
    );

    if (isExistEmail) {
      return response.status(409).json({ error: "Email already exist !" });
    }
    if (isExistUsername) {
      return response.status(409).json({ error: "Username already exist !" });
    }

    user.createdAt = new Date();

    try {
      const result = await this.authService.register(user);

      if (result) {
        const token = await this.generateToken(
          result.id,
          result.username,
          result.role
        );
        return response.status(200).json({
          accessToken: token,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);

      return response.status(500).json({ error: error });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return response.status(404).json({ error: "Email is invalid !" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return response
        .status(404)
        .json({ error: "Email or password invalid !" });
    }

    console.log(user);

    const token = await this.generateToken(user.id, user.username, user.role);
    user.password = undefined;
    return response.status(200).json({
      accessToken: token,
      data: user,
    });
  }

  async logout() {}

  // Generate token
  async generateToken(userId: number, username: string, role: Role) {
    const token = jwt.sign(
      { id: userId, username: username, role: role.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }
}
