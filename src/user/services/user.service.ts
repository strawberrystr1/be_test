import db from "../../config/db";
import { CreateUserDTO } from "../dto/create.user.dto";
import { FindUserDTO } from "../dto/find.user.dto";

class UserService {
  signup(data: CreateUserDTO) {
    return db.query('INSERT INTO user_data (name, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *', [data.name, data.password, data.email, data.role])
  }

  signin(data: FindUserDTO) {
    return db.query(`
      SELECT * FROM user_data WHERE name = $1
    `, [data.name])
  }

  findUserForAuth(name: string) {
    return db.query(`
      SELECT id, name, meets, role FROM user_data WHERE name = $1
    `, [name])
  }

  assignToMeetup(userId: string, meetId: string) {
    return db.query(`
      UPDATE user_data
      SET meets = ARRAY(SELECT DISTINCT * FROM unnest(array_append(meets, $2)))
      WHERE id = $1
      RETURNING *
    `, [userId, meetId])
  }
}

export default new UserService()