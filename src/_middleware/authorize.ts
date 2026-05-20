import { expressjwt as jwt } from "express-jwt";
import { Request, Response } from "express";
import db from "../_helpers/db";
import dotenv from "dotenv";

dotenv.config();

export default function authorize(roles: any = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    async (req: any, res: any, next: any) => {
      const account = await db.Account.findByPk(req.auth.id);

      if (!account || (roles.length && !roles.includes(account.role))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.auth.role = account.role;
      const refreshToken = await db.getRefreshToken();
      req.auth.ownsToken = (token: any) =>
        !!refreshToken.find((x: any) => x.token === token);
      next();
    },
  ];
}
