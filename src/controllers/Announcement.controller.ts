import { Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import Announcement from '../models/Announcement';
import  AppError  from '../errors/AppError';
import { CreateAnnouncementService } from '../services/announcements/announcementCreate.service';
import DeleteAnnouncementService from '../services/announcements/announcementDelete.service';
import { listAnnouncementService } from '../services/announcements/announcementList.service';
import announcementListOneService from '../services/announcements/announcementListOne.service';
import deleteVehicleService from '../services/announcements/announcementDelete.service';

export default class AnnouncementController {
  static async store(req: Request, res: Response) {
    try {
      const {
        announcement_type,
        title,
        year,
        comments,
        km,
        price,
        vehicle_type,
        description,
        is_published,
      } = req.body;

      const { user_id } = req.params;
      // console.log(req.params);
      const newAnnouncement = await CreateAnnouncementService({
        ...req.body,
        user_id: user_id,
      });

      return res
        .status(201)
        .json({ message: 'Anúncio criado', newAnnouncement });
    } catch (err) {
     // if (err instanceof AppError) {
     //   AppError('erro', 400);
    //  }
    return res.status(400)
    }
  }

  static async index(req: Request, res: Response) {
    const vehicles = await listAnnouncementService();

    return res.json(vehicles);
  }

  // static async listByUser(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;

  //     const announcement = await announcementListOneService(id);

  //     return res.status(200).json({ announcement });
  //   } catch (err) {
  //     if (err instanceof AppError) {
  //       handleError(err, res);
  //     }
  //   }
  // }

  static async listByUser(req: Request, res: Response) {
    const { id } = req.params;

    const announcement = await announcementListOneService(id);

    return res.json(announcement);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteVehicleService(id);

    return res.status(204).json();
  }
}
