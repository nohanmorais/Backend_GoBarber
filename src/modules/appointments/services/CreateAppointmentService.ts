/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findApointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findApointmentInSameDate) {
            throw new AppError('This Appointment is already booked!', 400);
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
