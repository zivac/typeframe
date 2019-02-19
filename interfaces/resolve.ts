import { Request, Response, NextFunction } from "express";

export interface Resolve {

    resolve(req: Request, res: Response, next: NextFunction): Promise<void>

}