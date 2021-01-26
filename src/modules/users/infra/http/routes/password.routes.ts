import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPassworController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPassworController.create);
passwordRouter.post('/reset', resetPasswordController.create);


export default passwordRouter;
