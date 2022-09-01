import meetupService from "../services/user.service";
import { Request, Response } from "express";
import { QueryResult } from "pg";

import { CreateMeetupDTO } from "../dto/create.meetup.dto";
import { UpdateMeetupDTO } from "../dto/update.meetup.dto";
import { GetMeetupDTO } from "../dto/get.meetup.dto";
import { DeleteMeetupDTO } from "../dto/delete.meetup.dto";
import { createMeetupSchema, updateMeetupSchema } from "../validations/schemas";


class MeetupController {
  async getAll(req: Request, res: Response) {
    try {
      const meetups = await meetupService.getAll();
      res.json(meetups.rows);
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
      const createMeetupDTO = new CreateMeetupDTO(req.body)
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
      const meetup: QueryResult<DeleteMeetupDTO> =
        await meetupService.deleteMeetup(new DeleteMeetupDTO(id));
      res.json(meetup.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "unpredictable error" });
    }
  }
}

export default new MeetupController();
