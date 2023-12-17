import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const noneMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("Authorization")?.substring(7);

  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (!error) {
          request["user"] = decoded;
        }
      });
    }
    next();
  } catch (error) {
    const message = Object.values(error[0].constraints)[0];
    response.status(400).send({ message });
  }
};
