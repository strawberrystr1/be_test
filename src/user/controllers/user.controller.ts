import { Request, Response } from "express";
import { CreateUserDTO } from "../dto/create.user.dto";
import userService from "../services/user.service";
import { createUserSchema, findUserSchema } from "../validations/schema";
import jwt from "jsonwebtoken";
import { FindUserDTO } from "../dto/find.user.dto";

class UserController {
  async sigup(req: Request, res: Response) {
    try {
      const userDto = new CreateUserDTO(req.body);

      const { error } = createUserSchema.validate(userDto);

      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      const newUser = await userService.signup(userDto);
      res.json(newUser.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const findUserDto = new FindUserDTO(req.body);

      const { error } = findUserSchema.validate(findUserDto);

      if (error) {
        res.json({ message: error });
        return;
      }

      const user = await userService.signin(findUserDto);

      if (!user.rowCount) {
        res.json({ message: "User with this name doesn't exist" });
        return;
      }

      if (user.rows[0].password !== req.body.password) {
        res.json({ message: "Incorrect password" });
        return;
      }

      const accessToken = jwt.sign(
        {
          name: user.rows[0].name,
          id: user.rows[0].id,
        },
        "secret", { expiresIn: '1s' });

      res.json({
        user: user.rows[0],
        token: accessToken
      });
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }
}

export default new UserController();
