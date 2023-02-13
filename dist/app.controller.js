"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const local_auth_guard_1 = require("./auth/guards/local-auth.guard");
const Location_1 = require("./dataClasses/Location");
const Product_1 = require("./dataClasses/Product");
const locations_service_1 = require("./locations/locations.service");
const uuid_1 = require("uuid");
let AppController = class AppController {
    constructor(authService, locationsService) {
        this.authService = authService;
        this.locationsService = locationsService;
    }
    async hello() {
        return "To jest API, gościu";
    }
    async login(req) {
        return this.authService.generateToken(req.user);
    }
    async renewJWT(req) {
        return this.authService.generateToken(req.user);
    }
    async user(req) {
        return req.user;
    }
    async locations(req) {
        return await this.locationsService.getRootLocationsByIds(...req.user.locationIds);
    }
    async locationInfos(req) {
        let locations = await this.locationsService.getRootLocationsByIds(...req.user.locationIds);
        let rootLocationInfos = locations.map(({ id, name }) => {
            return { id, name };
        });
        return await this.locationsService.getRootLocationInfos(...req.user.locationIds);
    }
    async rootLocation(req, id) {
        if (!req.user.hasAccessTo(id))
            throw new common_1.UnauthorizedException("User does not have access to the root location.");
        let rootLocation = await this.locationsService.getRootLocationById(id);
        if (!rootLocation) {
            common_1.Logger.error("User has access to root location which does not exist");
            common_1.Logger.error(req.user);
            common_1.Logger.error("id: " + id);
            throw new common_1.BadRequestException("Given id does not match to any existing root location.");
        }
        else
            return rootLocation;
    }
    async putProduct(req, rootLocationId, targetLocationId, productName) {
        if (!req.user.hasAccessTo(rootLocationId))
            throw new common_1.UnauthorizedException("User does not have access to the root location.");
        let product = new Product_1.default(productName, (0, uuid_1.v4)());
        await this.locationsService.addProductToLocation(product, rootLocationId, targetLocationId);
        return product;
    }
    async deleteProduct(req, rootLocationId, productId) {
        if (!req.user.hasAccessTo(rootLocationId))
            throw new common_1.UnauthorizedException("User does not have access to the root location.");
        await this.locationsService.removeProductFromLocation(productId, rootLocationId);
    }
    async puLocation(req, rootLocationId, targetLocationId, locationName) {
        if (!req.user.hasAccessTo(rootLocationId))
            throw new common_1.UnauthorizedException("User does not have access to the root location.");
        let location = new Location_1.default((0, uuid_1.v4)(), locationName);
        await this.locationsService.addLocationToLocation(location, rootLocationId, targetLocationId);
        return location;
    }
    async deleteLocation(req, rootLocationId, locationId) {
        if (!req.user.hasAccessTo(rootLocationId))
            throw new common_1.UnauthorizedException("User does not have access to the root location.");
        await this.locationsService.removeLocationFromLocation(locationId, rootLocationId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "hello", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("renewJWT"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "renewJWT", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "user", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("locations"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "locations", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("locationInfos"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "locationInfos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("rootLocation/:id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id", new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "rootLocation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)("product"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)("rootLocation", new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Body)("targetLocation", new common_1.ParseUUIDPipe())),
    __param(3, (0, common_1.Body)("productName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "putProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("product"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)("rootLocation", new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Body)("product", new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)("location"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)("rootLocation", new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Body)("targetLocation", new common_1.ParseUUIDPipe())),
    __param(3, (0, common_1.Body)("locationName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "puLocation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("location"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)("rootLocation", new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Body)("location", new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteLocation", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        locations_service_1.LocationsService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map