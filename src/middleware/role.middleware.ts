import { NextFunction, Request, Response } from "express"

export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any
  if (user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'You have no permission for this action' })
  }
}