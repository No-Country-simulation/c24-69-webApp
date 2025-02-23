import { config } from 'dotenv'
import { DataSource } from 'typeorm'
const env = process.env.NODE_ENV || 'development';

config({
    path: `.env.${env}`,
})

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5433),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts']

})