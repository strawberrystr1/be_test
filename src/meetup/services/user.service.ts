import db from '../../config/db'

class MeetupService {
  getAll() {
    return db.query('SELECT * FROM meetups')
  }

  getOne(id: string) {
    return db.query('SELECT * FROM meetups WHERE id=$1', [id])
  }

  createMeetup(title: string, date: string, description: string, place: string, theme: string, tags: string[]) {
    const time = date + ' GMT+0'

    return db.query(`
      INSERT INTO meetups VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *
    `, [title, theme, description, time, place, tags])
  }

  updateMeetup(id: string, title: string, date: string, description: string, place: string, theme: string, tags: string[]) {
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

  deleteMeetup(id: string) {
    return db.query('DELETE FROM meetups WHERE id=$1 RETURNING *', [id])
  }
}

export default new MeetupService()