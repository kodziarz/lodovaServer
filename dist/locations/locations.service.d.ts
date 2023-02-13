import Location from 'src/dataClasses/Location';
import RootLocationInfo from 'src/dataClasses/LocationInfo';
import Product from 'src/dataClasses/Product';
import { Repository } from 'typeorm';
export declare class LocationsService {
    private locationsReposiory;
    constructor(locationsReposiory: Repository<Location>);
    instertInitData(): Promise<void>;
    getRootLocationById(rootLocationId: string): Promise<Location>;
    private instantiateLocation;
    getRootLocationsByIds(...rootLocationIds: string[]): Promise<Location[]>;
    getRootLocationInfos(...rootLocationIds: string[]): Promise<RootLocationInfo[]>;
    addProductToLocation(product: Product, rootLocationId: string, targetLocationId: string): Promise<void>;
    removeProductFromLocation(productId: string, rootLocationId: string): Promise<void>;
    addLocationToLocation(newLocation: Location, rootLocationId: string, targetLocationId: string): Promise<void>;
    removeLocationFromLocation(locationId: string, rootLocationId: string): Promise<void>;
}
