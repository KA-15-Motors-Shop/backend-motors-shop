import { Request, Response } from 'express';
import { loginService } from '../../services/sessions/login.services';

class SessionsController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await loginService({ email, password });

    return res.json(user);
  }
}

export default SessionsController;
