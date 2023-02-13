import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import User from 'src/dataClasses/User';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<User>;
}
export {};