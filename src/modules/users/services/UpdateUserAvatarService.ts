/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    avatarfilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id, avatarfilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated Users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFilesExist = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFilesExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarfilename;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
