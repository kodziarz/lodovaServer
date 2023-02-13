import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Location from 'src/dataClasses/Location';
import RootLocationInfo from 'src/dataClasses/LocationInfo';
import Product from 'src/dataClasses/Product';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LocationsService {

    constructor(
        @InjectRepository(Location)
        private locationsReposiory: Repository<Location>
    ) { }

    async instertInitData() {
        let location = new Location("a5c2b512-a8b8-11ed-b060-dcf505050c09", "test");
        location.locations = JSON.parse('[{"id":"d6a47073-7a7e-42dd-a718-cc76764c9afc","name":"test","locations":[{"id":"d4701e46-5856-4c36-bfa3-37540cb1f79f","name":"Lodówka","locations":[{"id":"f9965dc8-9105-44ce-96fc-65ad95ce3f47","name":"Górna półka","locations":[],"products":[{"name":"Jajco","id":"2546de8c-595f-4db0-8cb5-5a5f91844b8b"},{"name":"Xd","id":"bcaf4b0d-9385-4496-a82e-dbd0861c0986"},{"name":"Tak","id":"a3ef3dc7-f3ed-49a9-b09b-5c5240808c92"},{"name":"Nie","id":"0039b573-c81e-420b-a7d1-ec923849dea0"}]},{"id":"3f778f0b-96dd-4f14-9142-1264c29513eb","name":"Tak","locations":[],"products":[]},{"id":"7386982e-349a-4202-84ff-6f527bd37fe0","name":"Test","locations":[],"products":[]}],"products":[{"name":"Mleko","id":"6b66e99f-e233-49a3-add5-18dad1575e1e"},{"name":"Mleko","id":"ae782450-5541-4b57-8535-8dc614ad9c61"},{"name":"Mleko","id":"92a41cfb-f252-4ceb-aeac-7f887aaa1103"},{"name":"Mleko","id":"b040109c-577d-4938-a267-14748992f8e2"},{"name":"Mleko","id":"4e839e96-f106-4289-b9dd-5f4d4996b5cd"}]}],"products":[{"name":"Jajco","id":"b180b415-f992-4a9f-94aa-892299dc50fb"},{"name":"Jajco","id":"377842bf-9c33-4eed-9a15-c3dbb1ea718d"},{"name":"Jajco","id":"f0c732f2-d9e4-497b-a34f-ecfd2db5afa0"}]}]');
        location.products = JSON.parse('[{"name":"Masło","id":"b800c89b-23f6-4350-9d84-389f06702c41"},{"name":"Masło","id":"f01ab4f9-5404-40e5-9e7d-d92155243489"},{"name":"Jajco","id":"8ef125a4-4f5b-4b18-aeec-58a0053dc52c"},{"name":"Jajco","id":"07d0e3ad-aed1-4683-ba76-63a651cd5b14"},{"name":"Jajco","id":"602933d8-c3fc-4c9d-98b7-619ba1af0b33"},{"name":"Jajco","id":"9c3a43e2-e617-44a1-83f3-41ab0cd7996f"},{"name":"Jajco","id":"30a979c2-59d7-4afe-8995-d073845f1dbc"},{"name":"Jajco","id":"af8836eb-31c1-4a6d-8285-9f5adaae47f2"},{"name":"Tak","id":"a5071325-e672-4fd6-b555-c96324c46ec5"}]');
        Logger.debug("Location to insert: ");
        Logger.debug(JSON.stringify(location, null, 3));
        await this.locationsReposiory.save(location);
    }

    async getRootLocationById(rootLocationId: string): Promise<Location> {
        let result = await this.locationsReposiory.findOneBy({ id: rootLocationId });

        return this.instantiateLocation(result);
    }

    private instantiateLocation(location: Location) {
        location.locations = location.locations.map((locationData) => {
            return this.instantiateLocation(locationData);
        });
        location.products = location.products.map((productData) => {
            return Object.assign(new Product("tmp", "tmp"), productData);
        });
        return Object.assign(new Location("tmp", "tmp"), location);
    }

    async getRootLocationsByIds(...rootLocationIds: string[]): Promise<Location[]> {

        let result = await this.locationsReposiory.find({
            where: rootLocationIds.map((id) => { return { id }; })
        });

        return result.map((rootLocation) => { return this.instantiateLocation(rootLocation); });
    }

    async getRootLocationInfos(...rootLocationIds: string[]): Promise<RootLocationInfo[]> {
        let result = await this.locationsReposiory.find({
            select: {
                id: true,
                name: true
            },
            where: rootLocationIds.map((id) => { return { id }; })
        });

        return result;
    }

    async addProductToLocation(product: Product, rootLocationId: string, targetLocationId: string) {

        let rootLocation = await this.getRootLocationById(rootLocationId);
        if (rootLocation == null) throw new Error("User has acces to root location which does not exist.");

        let targetLocation = rootLocation.getLocation(targetLocationId);
        if (targetLocation == null) throw new NotFoundException();

        targetLocation.addProduct(product);

        await this.locationsReposiory.save(rootLocation);
    }

    async removeProductFromLocation(productId: string, rootLocationId: string) {

        let rootLocation = await this.getRootLocationById(rootLocationId);
        if (rootLocation == null) throw new Error("User has acces to root location which does not exist.");

        let targetLocation = rootLocation.getLocationOfProduct(productId);
        if (targetLocation == null) throw new NotFoundException();

        if (!targetLocation.removeProductById(productId)) throw new NotFoundException();

        this.locationsReposiory.save(rootLocation);
    }

    async addLocationToLocation(newLocation: Location, rootLocationId: string, targetLocationId: string) {

        let rootLocation = await this.getRootLocationById(rootLocationId);
        if (rootLocation == null) throw new Error("User has acces to root location which does not exist.");

        let targetLocation = rootLocation.getLocation(targetLocationId);
        if (targetLocation == null) throw new NotFoundException();

        targetLocation.addLocation(newLocation);
        await this.locationsReposiory.save(rootLocation);
    }

    async removeLocationFromLocation(locationId: string, rootLocationId: string) {

        let rootLocation = await this.getRootLocationById(rootLocationId);
        if (rootLocation == null) throw new Error("User has acces to root location which does not exist.");

        let targetLocation = rootLocation.getLocationOfLocation(locationId);
        if (targetLocation == null) throw new NotFoundException();

        if (!targetLocation.removeLocationById(locationId)) throw new NotFoundException();
    }
}
