export default class User {
    name: string;
    salt: string;
    hash: string;
    static lastId: number;
    locationIds: string[];
    id: number;
    token: string;
    constructor(name: string, salt: string, hash: string);
    hasAccessTo(LocationId: string): boolean;
}
