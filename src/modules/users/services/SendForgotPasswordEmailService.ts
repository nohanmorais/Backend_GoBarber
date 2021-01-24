/* eslint-disable no-useless-constructor */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';

import IUsersTokensRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UsersTokenRepository')
        private userTokenRepository: IUsersTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(!checkUserExists) {
            throw new AppError('User does not exist', 400);
        }

        await this.userTokenRepository.generate(checkUserExists.id);

        this.mailProvider.sendMail(email, 'Pedido de Recuperacao de senha recebido')
    }
}

export default SendForgotPasswordEmailService;
