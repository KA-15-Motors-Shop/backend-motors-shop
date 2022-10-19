import { Request, Response } from 'express';

import { CreateCommentService } from '../services/comments/commentsCreate.service';

export default class CommentController {
  static async store(req: Request, res: Response) {
    const { userId } = req.user;
    const { announcement_id } = req.params;
    const { text } = req.body;

    const comment = await CreateCommentService(
      { text },
      userId,
      announcement_id
    );

    return res.status(201).json(comment);
  }

  // static async index(req: Request, res: Response) {
  //   const comments = await getCommentsService();

  //   return res.json(comments);
  // }
}
