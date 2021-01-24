/* eslint-disable no-useless-constructor */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import IUsersTokensRepository from '../repositories/IUsersTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokenRepository')
        private userTokenRepository: IUsersTokensRepository,

        @inject('HashProvider')
        private hashprovider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User token does not exist', 400);

        }
        const user = await this.usersRepository.findById(userToken?.user_id);

        if(!user) {
            throw new AppError('user does not exist', 400)
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired', 400);
        }

        user.password = await this.hashprovider.generateHash(password);

        await this.usersRepository.save(user);

    }
}

export default ResetPasswordService;
