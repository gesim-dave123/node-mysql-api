import config from '../../config.json';
import mysql from 'mysql2/promise';
import {Sequelize} from 'sequelize';
import accountModel from '../models/account.model';
import refreshTokenModel from '../models/refresh-token.model';

const db: any = {}; //initially empty object
export default db;

initialize();

async function initialize(){
    const host = process.env.DB_HOST;
    const port = Number(process.env.DB_PORT) ;
    const user = process.env.DB_USER ;
    const password = process.env.DB_PASSWORD ;
    const database = process.env.DB_NAME;

    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
        ssl: process.env.DB_SSL === 'true' ? {
            rejectUnauthorized: true
        } : undefined
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        host,
        port,
        dialectOptions: {
            ssl: process.env.DB_SSL === 'true' ? {
                rejectUnauthorized: true
            } : undefined
        }
    });

    // Define models
    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    // Setup associations
    db.Account.hasMany(db.RefreshToken, { foreignKey: 'accountId' });
    db.RefreshToken.belongsTo(db.Account, { foreignKey: 'accountId' });

    // Sync database
    await sequelize.sync();
}

db.getRefreshToken = async function () {
    return await db.RefreshToken.findAll();
};

export async function getRefreshToken() {
    return await db.RefreshToken.findAll();
}