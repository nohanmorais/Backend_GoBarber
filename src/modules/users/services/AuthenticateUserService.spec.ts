// import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
    it('should be abble to authenticate', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeAUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeAUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const response = await authenticateUserService.execute({
            email: 'johndoe@gmail.com',
            password: '123456',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be abble to authenticate with non existing user', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUserService = new AuthenticateUserService(
            fakeAUsersRepository,
            fakeHashProvider,
        );

        expect(
            authenticateUserService.execute({
                email: 'johndoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be abble to authenticate with wrong password', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeAUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeAUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(
            authenticateUserService.execute({
                email: 'johndoe@gmail.com',
                password: 'wrongPassword',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

});
