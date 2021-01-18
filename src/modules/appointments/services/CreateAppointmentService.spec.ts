import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {

    it('should be apple to create a new appointment', async () => {

        const fakeAppointmentRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '121291821',
        });
        expect(appointment).toHaveProperty('id');
    });

});
