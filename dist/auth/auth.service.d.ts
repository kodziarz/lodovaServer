import User from 'src/dataClasses/User';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getTestData(): string;
    validateUser(login: string, password: string): Promise<User>;
    generateToken(user: User): {
        access_token: string;
    };
}
