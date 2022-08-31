import db from '../../config/db'
import { CreateMeetupDTO } from '../dto/create.meetup.dto'
import { GetMeetupDTO } from '../dto/get.meetup.dto'
import { DeleteMeetupDTO } from '../dto/delete.meetup.dto'
import { UpdateMeetupDTO } from '../dto/update.meetup.dto'

class MeetupService {
  getAll() {
    return db.query('SELECT * FROM meetups')
  }

  getOne(data: GetMeetupDTO) {
    return db.query('SELECT * FROM meetups WHERE id=$1', [data.id])
  }

  createMeetup(data: CreateMeetupDTO) {
    const { title, date, theme, description, place, tags } = data
    const time = date + ' GMT+0'

    return db.query(`
      INSERT INTO meetups VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *
    `, [title, theme, description, time, place, tags])
  }

  updateMeetup(data: UpdateMeetupDTO) {
    const { id, title, date, description, place, theme, tags } = data

    const timestamp = date ? date + ' GMT+0' : undefined

    return db.query(`UPDATE meetups
      SET
        title = COALESCE (NULLIF($2, ''), title),
        date = COALESCE (NULLIF($3, DATE), date),
        description = COALESCE (NULLIF($4, ''), description),
        place = COALESCE (NULLIF($5, ''), place),
        theme = COALESCE (NULLIF($6, ''), theme),
        tags = COALESCE (NULLIF($7, ARRAY['']), tags)
      WHERE id=$1
      RETURNING *`,
    [id, title, timestamp, description, place, theme, tags])
  }

  deleteMeetup(data: DeleteMeetupDTO) {
    return db.query('DELETE FROM meetups WHERE id=$1 RETURNING *', [data.id])
  }
}

export default new MeetupService()