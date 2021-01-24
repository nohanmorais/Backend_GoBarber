// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {

         fakeUsersRepository = new FakeUsersRepository();
         fakeUsersTokenRepository = new FakeUsersTokenRepository();
         fakeHashProvider = new FakeHashProvider();

         resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUsersTokenRepository,
            fakeHashProvider,
            );

    })

    it('should be abble to reset the password', async () => {


        let user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        const userToken = await fakeUsersTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            password: '654321',
            token: userToken.token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('654321');
        expect(updatedUser?.password).toBe('654321');
    });

    it('should not be abble to reset the password with non-existing token', async () => {

        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '123456',
        })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be abble to reset the password with non-existing user', async () => {

        const userToken = await fakeUsersTokenRepository.generate('non-existing-user');

        await expect(
            resetPasswordService.execute({
                token: userToken.token,
                password: '123456',
        })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be abble to reset passowrd after 2h', async () => {

        let user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        const userToken = await fakeUsersTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordService.execute({
                password: '654321',
                token: userToken.token,
        })).rejects.toBeInstanceOf(AppError);


    });

});
