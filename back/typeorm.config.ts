import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

if (env !== 'production') {
  config({ path: `.env.${env}` }); 
}

const isProduction = env === 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [isProduction ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isProduction ? 'dist/src/database/migrations/*.js' : 'src/database/migrations/*.ts'],
  synchronize: false,
  migrationsRun: isProduction, 
});
