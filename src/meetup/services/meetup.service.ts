import db from "../../config/db";
import { CreateMeetupDTO } from "../dto/create.meetup.dto";
import { GetMeetupDTO } from "../dto/get.meetup.dto";
import { DeleteMeetupDTO } from "../dto/delete.meetup.dto";
import { UpdateMeetupDTO } from "../dto/update.meetup.dto";
import { GetAllMeetupDTO } from "../dto/getAll.meetup.dto";
import { AssignMeetupDTO } from "../dto/assign.meetup.dto";

const sortQueries: {
  [key: string]: string;
} = {
  title: "ORDER BY title",
  theme: "ORDER BY theme",
  description: "ORDER BY description",
  date: "ORDER BY date",
};

class MeetupService {
  async getTotalAmount() {
    return db.query("SELECT COUNT(id) FROM meetups");
  }

  async getAll(params: GetAllMeetupDTO) {
    let { limit = 20, search, order, sortBy, total, page = 1 } = params;

    let query = `
    SELECT *
    FROM meetups
    WHERE theme || description || title
    ILIKE $1`;

    if (sortBy) {
      query += sortQueries[sortBy];
    }

    if (order) {
      query += ` ${order.toUpperCase()}`;
    }

    if (+limit < 20) {
      query += ` LIMIT ${limit}`;
    } else {
      query += ` LIMIT 20`;
      limit = 20;
    }

    const offset = +limit * (+page - 1);
    if (+page - 1 > 0 && offset < total) {
      query += ` OFFSET ${offset}`;
    }

    return db.query(query, [`%${search}%`]);
  }

  getOne(data: GetMeetupDTO) {
    return db.query("SELECT * FROM meetups WHERE id=$1", [data.id]);
  }

  createMeetup(data: CreateMeetupDTO) {
    const { title, date, theme, description, place, tags, createdby } = data;
    const time = date + " GMT+0";

    return db.query(
      `
      INSERT INTO meetups VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7) RETURNING *
    `,
      [title, theme, description, time, place, tags, createdby]
    );
  }

  updateMeetup(data: UpdateMeetupDTO) {
    const { id, title, date, description, place, theme, tags } = data;

    const timestamp = date ? date + " GMT+0" : undefined;

    return db.query(
      `UPDATE meetups
      SET
        title = COALESCE (NULLIF($2, ''), title),
        date = COALESCE (NULLIF($3, DATE), date),
        description = COALESCE (NULLIF($4, ''), description),
        place = COALESCE (NULLIF($5, ''), place),
        theme = COALESCE (NULLIF($6, ''), theme),
        tags = COALESCE (NULLIF($7, ARRAY['']), tags)
      WHERE id=$1
      RETURNING *`,
      [id, title, timestamp, description, place, theme, tags]
    );
  }

  deleteMeetup(data: DeleteMeetupDTO) {
    return db.query("DELETE FROM meetups WHERE id=$1 RETURNING *", [data.id]);
  }

  assignToMeetup(data: AssignMeetupDTO) {
    return db.query(
      `
        UPDATE meetups
        SET participants = ARRAY(SELECT DISTINCT * FROM unnest(array_append(participants, $2)))
        WHERE id = $1
        RETURNING *
      `,
      [data.meetup, data.id]
    );
  }
}

export default new MeetupService();
