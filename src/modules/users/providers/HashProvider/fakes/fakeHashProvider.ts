/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return payload === hashed;
    }
}

export default FakeHashProvider;
