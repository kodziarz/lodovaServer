"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("../dataClasses/User");
const bcrypt = require("bcrypt");
let user = new User_1.default("admin", "$2b$10$ZYc/dXp9vBNw6OtDrizXce", bcrypt.hashSync("admin", "$2b$10$ZYc/dXp9vBNw6OtDrizXce"));
user.locationIds.push("56f68765-ab2d-11ed-8cb0-f23c93f195e6");
const users = [user];
let UsersService = class UsersService {
    async validateUser(username, password) {
        for (const user of users) {
            if (user.name == username
                && user.hash == await bcrypt.hash(password, user.salt))
                return user;
        }
        return undefined;
    }
    async getUserById(userId) {
        for (const user of users) {
            if (user.id == userId) {
                return user;
            }
        }
        throw new UserNotFoundException();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
class UserNotFoundException extends Error {
    constructor() {
        super("Such a user does not exist.");
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=users.service.js.map