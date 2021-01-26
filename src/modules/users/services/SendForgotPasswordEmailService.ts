/* eslint-disable no-useless-constructor */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

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

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exist', 400);
        }

        const { token } = await this.userTokenRepository.generate(user.id);

        console.log({token});

        const emailSend = await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperacao de Senha',
            templateData: {
                template: 'Ola, {{name}}: {{token}}',
                variables: {
                    name: user.name,
                    token,
                }
            }

        });

    }
}

export default SendForgotPasswordEmailService;
