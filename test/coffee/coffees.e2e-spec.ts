import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeesModule } from "src/coffees/coffees.module";
import { CreateCoffeeDto } from "src/coffees/dto/create-coffee.dto";
import { Coffee } from "src/coffees/entities/coffee.entity";
import * as request from "supertest";

describe('[Feature] Coffees - /coffees', () => {

    let app: INestApplication;
    const env = process.env;

    const coffee = {
        name: 'Coffee',
        brand: 'Iluvcoffee',
        flavors: ['chocolate', 'strawberry']
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CoffeesModule,
                TypeOrmModule.forRootAsync({
                    useFactory: () => ({
                        type: 'mysql',
                        host: env.DATABASE_HOST,
                        port: parseInt(env.DATABASE_PORT),
                        username: env.DATABASE_USERNAME,
                        password: env.DATABASE_PASSWORD,
                        database: env.TEST_DATABASE_NAME,
                        autoLoadEntities: true,
                        synchronize: true // Only for development, don't use in production
                    })
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
        await app.init();
    });

    it('Create [POST /]', () => {
        return request(app.getHttpServer())
            .post('/coffees')
            .send(coffee as CreateCoffeeDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                const savedCoffee = body as Coffee;
                const name = 'Coffee';
                const brand = 'Iluvcoffee'

                expect(savedCoffee.id).toBeDefined();
                expect(savedCoffee.name).toEqual(name);
                expect(savedCoffee.brand).toEqual(brand);
                expect(savedCoffee.flavors.length).toEqual(2);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});