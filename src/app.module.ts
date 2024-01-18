import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';

@Module({
  imports:
    [
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true // Only for development, don't use in production
        })
      }),
      ConfigModule.forRoot({
        load: [appConfig]
      }),
      CoffeesModule,
      CoffeeRatingModule,
      DatabaseModule,
      CommonModule
    ],
  controllers:
    [
      AppController,
      CoffeesController
    ],
  providers:
    [
      AppService,
      CoffeesService
    ],
})
export class AppModule { }