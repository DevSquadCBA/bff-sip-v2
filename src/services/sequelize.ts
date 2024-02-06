import { Sequelize } from 'sequelize';
import { InternalServerError } from 'types/errors';

const { HOST, USER, PASS, DB } = process.env;

if (!HOST || !USER || !PASS || !DB) {
    throw new InternalServerError('Missing environment variables');
}

const sequelize = new Sequelize(DB, USER, PASS, {
    host: HOST,
    dialect: 'mysql',
});

export default sequelize;
