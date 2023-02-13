import { Strategy } from "passport-jwt";
import JwtPayload from "src/dataClasses/JwtPayload";
import User from "src/dataClasses/User";
import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
