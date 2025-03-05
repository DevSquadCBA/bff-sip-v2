
import { Sale } from 'models/Sale';
import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { Sequelize } from 'sequelize-typescript';
import { InternalServerError } from 'types/errors';
import { Provider } from 'models/Provider';
import { SaleProduct } from 'models/SaleProduct';
import { Rol } from 'models/Rol';
import { User } from 'models/User';
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

sequelize.addModels([Client , Sale , Product, Provider, SaleProduct, User, Rol])

Sale.belongsToMany(Product, { through: SaleProduct , foreignKey: 'saleId', as:'products' });
Sale.hasMany(SaleProduct, { foreignKey: 'saleId', as: 'saleProducts' });

Product.belongsToMany(Sale, { through: SaleProduct , foreignKey: 'productId', as: 'sales' });

SaleProduct.belongsTo(Sale, { foreignKey: 'saleId', as:'sale'});
SaleProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product'});

Product.hasMany(SaleProduct, { foreignKey: 'productId', as: 'saleProducts' });

Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider'});
Sale.belongsTo(Client, { foreignKey: 'clientId'});


export default sequelize;
