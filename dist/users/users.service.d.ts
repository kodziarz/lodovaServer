import User from 'src/dataClasses/User';
export declare class UsersService {
    validateUser(username: string, password: string): Promise<User | undefined>;
    getUserById(userId: number): Promise<User>;
}
export declare class UserNotFoundException extends Error {
    constructor();
}
