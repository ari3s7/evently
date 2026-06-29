import type{ Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
}