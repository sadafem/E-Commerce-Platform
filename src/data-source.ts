import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Product } from './entities/Product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your-username',
  password: 'your-password',
  database: 'ecommerce',
  synchronize: true,
  logging: true,
  entities: [User, Product],
  subscribers: [],
  migrations: [],
});