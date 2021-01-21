// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be apple to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '121291821',
        });
        expect(appointment).toHaveProperty('id');
    });

    it('should not be apple to create two appointments in the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '121291821',
        });
        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '121291821',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
