import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import Location from 'src/dataClasses/Location';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsService],
  exports: [LocationsService]
})
export class LocationsModule { }
