// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/storageProviders/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
    it('should be abble to update an avatar', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider =  new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(fakeAUsersRepository, fakeStorageProvider,);

        const user = await fakeAUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarfilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be abble to update an avatar that the user dont exist', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider =  new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(fakeAUsersRepository, fakeStorageProvider,);

        const user = await fakeAUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await

        expect(updateUserAvatar.execute({
            user_id: 'user-dont-exist',
            avatarfilename: 'avatar.jpg',
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should delete old avatar when updating the new one', async () => {
        const fakeAUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider =  new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(fakeAUsersRepository, fakeStorageProvider,);

        const user = await fakeAUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarfilename: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarfilename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');

    });

});
