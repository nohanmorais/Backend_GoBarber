/* eslint-disable no-useless-constructor */
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExist = await this.usersRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Email already exist!', 400);
        }

        const hashedpassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedpassword,
        });

        return user;
    }
}

export default CreateUserService;
