import { container } from 'tsyringe';


import IStorageProvider from './storageProviders/models/IStorageProvider';
import DiskStorageProvider from './storageProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
    );


container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
    );


container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
    );
