import { DataSource, DataSourceOptions } from 'typeorm';

const {
    TYPEORM_HOST,
    TYPEORM_PORT,
    TYPEORM_USERNAME,
    TYPEORM_PASSWORD,
    TYPEORM_DATABASE,
} = process.env;

const dbConfig = {
    type: 'postgres',
    host: TYPEORM_HOST,
    port: parseInt(TYPEORM_PORT as string),
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    synchronize: false,
    logging: false
};

export const dataSource = new DataSource(dbConfig as DataSourceOptions);
