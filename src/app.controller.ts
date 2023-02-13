import { BadRequestException, Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseUUIDPipe, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import Location from './dataClasses/Location';
import RootLocationInfo from './dataClasses/LocationInfo';
import Product from './dataClasses/Product';
import User from './dataClasses/User';
import { LocationsService } from './locations/locations.service';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly locationsService: LocationsService
  ) { }

  @Get()
  async hello(): Promise<string> {
    return "To jest API, gościu";
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("renewJWT")
  async renewJWT(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  async user(@Request() req): Promise<User> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get("locations")
  async locations(@Request() req): Promise<Location[]> {
    return await this.locationsService.getRootLocationsByIds(...req.user.locationIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get("locationInfos")
  async locationInfos(@Request() req): Promise<RootLocationInfo[]> {

    let locations = await this.locationsService.getRootLocationsByIds(...req.user.locationIds);

    let rootLocationInfos: RootLocationInfo[] = locations.map(({ id, name }) => {
      return { id, name };
    });

    return await this.locationsService.getRootLocationInfos(...req.user.locationIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get("rootLocation/:id")
  async rootLocation(
    @Request() req,
    @Param("id", new ParseUUIDPipe()) id: string) {

    if (!req.user.hasAccessTo(id)) throw new UnauthorizedException("User does not have access to the root location.");

    let rootLocation = await this.locationsService.getRootLocationById(id);


    if (!rootLocation) {
      Logger.error("User has access to root location which does not exist");
      Logger.error(req.user);
      Logger.error("id: " + id);
      throw new BadRequestException("Given id does not match to any existing root location.");
    } else return rootLocation;
  }

  @UseGuards(JwtAuthGuard)
  @Put("product")
  async putProduct(
    @Request() req,
    @Body("rootLocation", new ParseUUIDPipe()) rootLocationId: string,
    @Body("targetLocation", new ParseUUIDPipe()) targetLocationId: string,
    @Body("productName") productName: string) {

    if (!req.user.hasAccessTo(rootLocationId)) throw new UnauthorizedException("User does not have access to the root location.");

    let product = new Product(productName, uuidv4());

    await this.locationsService.addProductToLocation(product, rootLocationId, targetLocationId);
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete("product")
  async deleteProduct(
    @Request() req,
    @Body("rootLocation", new ParseUUIDPipe()) rootLocationId: string,
    @Body("product", new ParseUUIDPipe()) productId: string) {

    if (!req.user.hasAccessTo(rootLocationId)) throw new UnauthorizedException("User does not have access to the root location.");

    await this.locationsService.removeProductFromLocation(productId, rootLocationId);
  }

  @UseGuards(JwtAuthGuard)
  @Put("location")
  async puLocation(
    @Request() req,
    @Body("rootLocation", new ParseUUIDPipe()) rootLocationId: string,
    @Body("targetLocation", new ParseUUIDPipe()) targetLocationId: string,
    @Body("locationName") locationName: string) {

    if (!req.user.hasAccessTo(rootLocationId)) throw new UnauthorizedException("User does not have access to the root location.");

    let location = new Location(uuidv4(), locationName);
    await this.locationsService.addLocationToLocation(location, rootLocationId, targetLocationId);
    return location;
  }

  @UseGuards(JwtAuthGuard)
  @Delete("location")
  async deleteLocation(
    @Request() req,
    @Body("rootLocation", new ParseUUIDPipe()) rootLocationId: string,
    @Body("location", new ParseUUIDPipe()) locationId: string) {

    if (!req.user.hasAccessTo(rootLocationId)) throw new UnauthorizedException("User does not have access to the root location.");

    await this.locationsService.removeLocationFromLocation(locationId, rootLocationId);
  }
}
