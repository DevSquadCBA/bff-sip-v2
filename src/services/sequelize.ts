
import { Budget } from 'models/Budget';
import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { Sequelize } from 'sequelize-typescript';
import { InternalServerError } from 'types/errors';
const { HOST, USER, PASS, DB } = process.env;

if (!HOST || !USER || !PASS || !DB) {
    throw new InternalServerError('Missing environment variables');
}

const sequelize = new Sequelize({
    database: DB,
    username: USER,
    password: PASS,
    host: HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
});
console.log(sequelize.config.database);

sequelize.addModels([Client , Budget , Product])

export default sequelize;
