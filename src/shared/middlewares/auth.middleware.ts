import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { LoginDTO, RegisterDTO } from "../../dto/auth.dto";
import * as jwt from "jsonwebtoken";

const tokenBlacklist = new Set();

export const validateRegisterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password, isActive, verifyBy, role } = req.body;

  try {
    const user = new RegisterDTO();
    user.email = email;
    user.username = username;
    user.password = password;
    user.role = role;

    await validateOrReject(user);
    next();
  } catch (error) {
    const message = Object.values(error[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const data = new LoginDTO();
    data.email = email;
    data.password = password;
    await validateOrReject(data);
    next();
  } catch (error) {
    const message = Object.values(error[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("Authorization")?.substring(7);

  if (!token) {
    return response.status(401).json({ error: "You are not authorized !" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return response.status(401).json({ message: "Token has expired." });
      } else {
        return response
          .status(403)
          .json({ message: "Access denied. Invalid token." });
      }
    }
    request["user"] = decoded;
    next();
  });
};

export const verifyAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("Authorization")?.substring(7);

  if (!token) {
    return response.status(401).json({ error: "You are not authorized !" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return response.status(401).json({ message: "Token has expired." });
      } else {
        return response
          .status(403)
          .json({ message: "Access denied. Invalid token." });
      }
    }
    if (decoded["role"] === 1) {
      request["user"] = decoded;
      next();
    } else {
      return response.status(403).json({ message: "Permission denied." });
    }
  });
};
