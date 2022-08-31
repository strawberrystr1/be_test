import meetupService from '../services/user.service'
import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { CreateMeetupDTO } from '../dto/create.meetup.dto'

class MeetupController {
  async getAll(req: Request, res: Response) {
    try {
      const meetups = await meetupService.getAll()
      res.json(meetups.rows)
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params
      const meetup = await meetupService.getOne(id)
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async createMeetup(req: Request<never, any, CreateMeetupDTO>, res: Response) {
    try {
      const { title, date, description, place, theme, tags } = req.body

      if ([title, date, description, place, theme, tags].some(e => !e)) {
        return res.status(400).json({ message: 'incorrect input' })
      }

      const meetup: QueryResult<CreateMeetupDTO> = await meetupService.createMeetup(title, date, description, place, theme, tags)
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { title, date, description, place, theme, tags } = req.body

      const meetup = await meetupService.updateMeetup(id, title, date, description, place, theme, tags)
      
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const meetup = await meetupService.deleteMeetup(id)
      res.json(meetup.rows[0])
    } catch (e) {
      res.status(500).json({ message: 'unpredictable error' })
    }
  }
}

export default new MeetupController()