// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPassordEmail', () => {
    beforeEach(() => {
         fakeUsersRepository = new FakeUsersRepository();
         fakeMailProvider = new FakeMailProvider();
         fakeUsersTokenRepository = new FakeUsersTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUsersTokenRepository,
            );

    })

    it('should be abble to recover the password using the email', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be abble to recover a non-existing user password', async () => {

        await expect(
            sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {


        const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');


        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });

});
