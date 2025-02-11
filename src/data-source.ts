import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Product } from './entities/Product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: 'sadafem',
  password: 'Sherlock-76',
  database: 'ecommerce',
  synchronize: true,
  logging: true,
  entities: [User, Product],
  subscribers: [],
  migrations: [],
});