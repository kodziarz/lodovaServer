import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";

@Entity({ name: "location" })
export default class Location {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("simple-json", {
        nullable: false,
        // default: "[]"
    })
    locations: Location[];

    @Column("simple-json", {
        nullable: false,
        // default: "[]"
    })
    products: Product[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.locations = [];
        this.products = [];
    }

    addLocation(location: Location) {
        this.locations.push(location);
    }

    getLocation(id: string) {
        if (this.id === id) return this;
        for (const location of this.locations) {
            let result = location.getLocation(id);
            if (result != null) return result;
        }
        return null;
    }

    removeLocationById(id: string) {
        for (let i = 0; i < this.locations.length; i++) {
            const checkedLocation = this.locations[i];
            if (checkedLocation.id === id) {
                this.locations.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    getLocationOfLocation(locationId: string) {
        for (const checkedLocation of this.locations) {
            if (checkedLocation.id === locationId)
                return this;
        }
        for (let i = 0; i < this.locations.length; i++) {
            const location = this.locations[i];
            let searchedLocation = location.getLocationOfLocation(locationId);
            if (searchedLocation != null) return searchedLocation;
        }
        return null;
    }

    getLocationOfProduct(productId: string): Location | null {
        for (const checkedProduct of this.products) {
            if (checkedProduct.id === productId)
                return this;
        }
        for (let i = 0; i < this.locations.length; i++) {
            const location = this.locations[i];
            let searchedLocation = location.getLocationOfProduct(productId);
            if (searchedLocation != null) return searchedLocation;
        }
        return null;
    }

    getProductById(productId: string) {
        for (const checkedProduct of this.products) {
            if (checkedProduct.id === productId) return checkedProduct;
        }
        return null;
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProductById(id: string) {
        for (let i = 0; i < this.products.length; i++) {
            const checkedProduct = this.products[i];
            if (checkedProduct.id === id) {
                this.products.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    removeProduct(product: Product) {
        for (let i = 0; i < this.products.length; i++) {
            const checkedProduct = this.products[i];
            if (checkedProduct.id === product.id) {
                this.products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}