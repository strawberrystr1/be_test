const db = require('../db')

class MeetupController {
  async getAll(req, res) {
    try {
      const meetups = await db.query('SELECT * FROM meetups')
      res.json(meetups.rows)
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      const meetup = await db.query('SELECT * FROM meetups WHERE id=$1', [id])
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async createMeetup(req, res) {
    try {
      const { title, date, description, place, theme, tags } = req.body

      if ([title, date, description, place, theme, tags].some(e => !e)) {
        return res.status(400).json({ message: 'incorrect input' })
      }

      const time = date + ' GMT+0'

      const meetup = await db.query(`
      INSERT INTO meetups VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *
      `, [title, theme, description, time, place, tags])
      res.json(meetup.rows[0])
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { title, date, description, place, theme, tags } = req.body

      const timestamp = date ? date + ' GMT+0' : undefined

      const meetup = await db.query(`UPDATE meetups
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
      
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const meetup = await db.query('DELETE FROM meetups WHERE id=$1 RETURNING *', [id])
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }
}

module.exports = new MeetupController()