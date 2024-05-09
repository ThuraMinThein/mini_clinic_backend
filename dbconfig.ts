import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: +process.env.MYSQLPORT,
  username: process.env.MYSQLUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
};

export default config;
