import config from '../../config.json';
import mysql from 'mysql2/promise';
import {Sequelize} from 'sequelize';
import accountModel from '../models/account.model';
import refreshTokenModel from '../models/refresh-token.model';

const db: any = {}; //initially empty object
export default db;

initialize();

async function initialize(){
    const {host, port, user, password, database} = config.database;
    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password
    });

    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql', host, port});

    // Define models
    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    // Setup associations
    db.Account.hasMany(db.RefreshToken, { foreignKey: 'accountId' });
    db.RefreshToken.belongsTo(db.Account, { foreignKey: 'accountId' });

    // Sync database
    await sequelize.sync();
}

export async function getRefreshToken() {
    return await db.RefreshToken.findAll();
}