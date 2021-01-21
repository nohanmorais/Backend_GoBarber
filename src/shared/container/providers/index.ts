import IStorageProvider from './storageProviders/models/IStorageProvider';
import DiskStorageProvider from './storageProviders/implementations/DiskStorageProvider';
import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider,);

