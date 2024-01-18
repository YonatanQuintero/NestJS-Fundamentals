import { DataSource } from "typeorm";

export default new DataSource({
    type: 'mysql',
    host: 'xx.xxx.xxx.xxx',
    port: 1000,
    username: 'xxxx',
    password: 'xxx',
    database: 'xxx',
    entities: [],
    migrations: []
});