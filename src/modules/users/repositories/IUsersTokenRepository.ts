import User from '../infra/typeorm/entities/User';
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
