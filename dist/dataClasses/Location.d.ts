import Product from "./Product";
export default class Location {
    id: string;
    name: string;
    locations: Location[];
    products: Product[];
    constructor(id: string, name: string);
    addLocation(location: Location): void;
    getLocation(id: string): any;
    removeLocationById(id: string): boolean;
    getLocationOfLocation(locationId: string): any;
    getLocationOfProduct(productId: string): Location | null;
    getProductById(productId: string): Product;
    addProduct(product: Product): void;
    removeProductById(id: string): boolean;
    removeProduct(product: Product): boolean;
}
