import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user';
import { Role } from './entity/role';
import { Bird, History, Prediction } from './entity';
import { BirdStatus } from './entity/bird-status';
import { BirdOrder } from './entity/bird-order';
import { BirdFamily } from './entity/bird-family';

export const AppDataSource = new DataSource({
  type: 'mysql',
  // host: "34.143.244.24",
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Bame12345@',
  // database: "njha_bird_db",
  database: 'njha-api',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Role,
    History,
    Prediction,
    Bird,
    BirdStatus,
    BirdOrder,
    BirdFamily,
  ],
  migrations: [],
  subscribers: [],
});
