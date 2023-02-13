import { AuthService } from './auth/auth.service';
import Location from './dataClasses/Location';
import RootLocationInfo from './dataClasses/LocationInfo';
import Product from './dataClasses/Product';
import User from './dataClasses/User';
import { LocationsService } from './locations/locations.service';
export declare class AppController {
    private readonly authService;
    private readonly locationsService;
    constructor(authService: AuthService, locationsService: LocationsService);
    hello(): Promise<string>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    renewJWT(req: any): Promise<{
        access_token: string;
    }>;
    user(req: any): Promise<User>;
    locations(req: any): Promise<Location[]>;
    locationInfos(req: any): Promise<RootLocationInfo[]>;
    rootLocation(req: any, id: string): Promise<Location>;
    putProduct(req: any, rootLocationId: string, targetLocationId: string, productName: string): Promise<Product>;
    deleteProduct(req: any, rootLocationId: string, productId: string): Promise<void>;
    puLocation(req: any, rootLocationId: string, targetLocationId: string, locationName: string): Promise<Location>;
    deleteLocation(req: any, rootLocationId: string, locationId: string): Promise<void>;
}
