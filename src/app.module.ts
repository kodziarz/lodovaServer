import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Location from './dataClasses/Location';

@Module({
  imports: [AuthModule, UsersModule, LocationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Location],
      // synchronize: true // DEV
    })
    // epiz_33580190
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: "mongodb+srv://admin:<password>@cluster0.ofsvdce.mongodb.net/?retryWrites=true&w=majority",
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   synchronize: true, // DEV
    //   logging: true,
    //   entities: [Location],
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
