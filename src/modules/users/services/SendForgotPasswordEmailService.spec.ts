// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


describe('SendForgotPassordEmail', () => {

    it('should be abble to recover the password using the email', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const SendForgotPassordEmail = new SendForgotPasswordEmailService(
            fakeAUsersRepository,
            fakeMailProvider,
            );

        await fakeAUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await SendForgotPassordEmail.execute({
            email: 'johndoe@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });


});
