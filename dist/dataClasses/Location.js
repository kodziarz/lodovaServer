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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Location = class Location {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.locations = [];
        this.products = [];
    }
    addLocation(location) {
        this.locations.push(location);
    }
    getLocation(id) {
        if (this.id === id)
            return this;
        for (const location of this.locations) {
            let result = location.getLocation(id);
            if (result != null)
                return result;
        }
        return null;
    }
    removeLocationById(id) {
        for (let i = 0; i < this.locations.length; i++) {
            const checkedLocation = this.locations[i];
            if (checkedLocation.id === id) {
                this.locations.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    getLocationOfLocation(locationId) {
        for (const checkedLocation of this.locations) {
            if (checkedLocation.id === locationId)
                return this;
        }
        for (let i = 0; i < this.locations.length; i++) {
            const location = this.locations[i];
            let searchedLocation = location.getLocationOfLocation(locationId);
            if (searchedLocation != null)
                return searchedLocation;
        }
        return null;
    }
    getLocationOfProduct(productId) {
        for (const checkedProduct of this.products) {
            if (checkedProduct.id === productId)
                return this;
        }
        for (let i = 0; i < this.locations.length; i++) {
            const location = this.locations[i];
            let searchedLocation = location.getLocationOfProduct(productId);
            if (searchedLocation != null)
                return searchedLocation;
        }
        return null;
    }
    getProductById(productId) {
        for (const checkedProduct of this.products) {
            if (checkedProduct.id === productId)
                return checkedProduct;
        }
        return null;
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProductById(id) {
        for (let i = 0; i < this.products.length; i++) {
            const checkedProduct = this.products[i];
            if (checkedProduct.id === id) {
                this.products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    removeProduct(product) {
        for (let i = 0; i < this.products.length; i++) {
            const checkedProduct = this.products[i];
            if (checkedProduct.id === product.id) {
                this.products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Location.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-json", {
        nullable: false,
    }),
    __metadata("design:type", Array)
], Location.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-json", {
        nullable: false,
    }),
    __metadata("design:type", Array)
], Location.prototype, "products", void 0);
Location = __decorate([
    (0, typeorm_1.Entity)({ name: "location" }),
    __metadata("design:paramtypes", [String, String])
], Location);
exports.default = Location;
//# sourceMappingURL=Location.js.map