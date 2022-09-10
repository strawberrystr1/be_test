import meetupService from "../services/meetup.service";
import { Request, Response } from "express";
import { QueryResult } from "pg";

import { CreateMeetupDTO } from "../dto/create.meetup.dto";
import { UpdateMeetupDTO } from "../dto/update.meetup.dto";
import { GetMeetupDTO } from "../dto/get.meetup.dto";
import { DeleteMeetupDTO } from "../dto/delete.meetup.dto";
import { createMeetupSchema, updateMeetupSchema } from "../validations/schemas";
import { GetAllMeetupDTO } from "../dto/getAll.meetup.dto";
import userService from "../../user/services/user.service";


class MeetupController {
  async getAll(req: Request, res: Response) {
    try {
      const { rows } = await meetupService.getTotalAmount()

      const getAllMeetupDTO = new GetAllMeetupDTO(req.query, rows[0].count)

      const meetups = await meetupService.getAll(getAllMeetupDTO);

      res.json({ data: meetups.rows, totalCount: rows[0].count });
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const meetup: QueryResult<GetMeetupDTO> = await meetupService.getOne(new GetMeetupDTO(id));
      res.json(meetup.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }

  async createMeetup(req: Request, res: Response) {
    try {
      const { user } = req as any
      const createMeetupDTO = new CreateMeetupDTO(req.body, user.id)
      const { error } = createMeetupSchema.validate(createMeetupDTO)

      if (error) {
        res.status(400).json({ message: error.message })
        return
      }

      const meetup: QueryResult<CreateMeetupDTO> =
        await meetupService.createMeetup(createMeetupDTO);
      res.json(meetup.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updateMeetupDTO = new UpdateMeetupDTO(id, req.body)
      const { error } = updateMeetupSchema.validate(updateMeetupDTO)

      if (error) {
        res.status(400).json({ message: error.message })
        return
      }

      const meetup: QueryResult<UpdateMeetupDTO> =
        await meetupService.updateMeetup(updateMeetupDTO);

      res.json(meetup.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = req.user as any
      
      if (user.role === 'admin') {
        const meetup: QueryResult<DeleteMeetupDTO> =
          await meetupService.deleteMeetup(new DeleteMeetupDTO(id));
        res.json(meetup.rows[0]);
      } else {
        res.status(409).json({ message: 'You have no permission for this action' })
      }
      
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }

  async assignToMeetup(req: Request, res: Response) {
    try {
      const user = req.user as any
      const { id } = req.params

      if (user!.hasOwnProperty('id')) {
        const meetup = await meetupService.assignToMeetup({
          id: user.id,
          meetup: id
        })
        await userService.assignToMeetup(user.id, id)
        res.json(meetup.rows[0])
      }
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }
}

export default new MeetupController();
