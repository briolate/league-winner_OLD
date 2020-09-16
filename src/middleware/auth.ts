import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

interface GetUserAuthInfoRequest extends Request {
  user: string;
}

export default function(
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token; authorization denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = (decoded as any).user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
