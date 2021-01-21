// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

describe('CreateUser', () => {
    it('should be abble to create a new user', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            fakeAUsersRepository,
            fakeHashProvider,
        );

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });
        expect(user).toHaveProperty('id');
    });

    it('should not be abble to create a new user with the same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
