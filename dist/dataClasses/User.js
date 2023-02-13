"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, salt, hash) {
        this.name = name;
        this.salt = salt;
        this.hash = hash;
        this.locationIds = [];
        this.id = User.lastId++;
        this.token = null;
    }
    hasAccessTo(LocationId) {
        return !(this.locationIds.every((locationId) => {
            return locationId !== locationId;
        }));
    }
}
exports.default = User;
User.lastId = 0;
//# sourceMappingURL=User.js.map