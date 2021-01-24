import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPassordController from '../controllers/ResetPasswordController';
import SessionsController from '../controllers/SessionsController';

const passwordRouter = Router();
const forgotPassworController = new ForgotPassordController();
const resetPasswordService = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPassworController.create);
passwordRouter.post('/reset', resetPasswordService.create);


export default passwordRouter;
