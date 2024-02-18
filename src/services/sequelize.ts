
import { Sale } from 'models/Sale';
import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { Sequelize } from 'sequelize-typescript';
import { InternalServerError } from 'types/errors';
import { Provider } from 'models/Provider';
import { SaleProduct } from 'models/SaleProduct';
const { HOST, USER, PASS, DB } = process.env;

if (!HOST || !USER || !PASS || !DB) {
    throw new InternalServerError('Missing environment variables' + JSON.stringify({HOST,USER,PASS,DB}));
}

const sequelize = new Sequelize({
    database: DB,
    username: USER,
    password: PASS,
    host: HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: (msg) => console.dir(msg),
});

sequelize.addModels([Client , Sale , Product, Provider, SaleProduct])

Sale.belongsToMany(Product, { through: SaleProduct , foreignKey: 'saleId' });
Product.belongsToMany(Sale, { through: SaleProduct , foreignKey: 'productId' });

Product.belongsTo(Provider, { foreignKey: 'provider' });
Sale.belongsTo(Client, { foreignKey: 'clientId' });


export default sequelize;
