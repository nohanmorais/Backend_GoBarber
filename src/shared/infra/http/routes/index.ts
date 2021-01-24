import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const route = Router();
route.use('/appointments', appointmentsRouter);
route.use('/users', usersRouter);
route.use('/sessions', sessionsRouter);
route.use('/password', passwordRouter);

export default route;
