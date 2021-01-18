import { Router } from 'express';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

import multer from 'multer';
import UploadConfig from '@config/upload';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(UploadConfig);


 usersRouter.post('/', userController.create);

usersRouter.patch('/avatar', ensureAuthenticated,
upload.single('avatar'), userAvatarController.update);

export default usersRouter;
