import {DataTypes} from 'sequelize';

export default function accountModel(sequelize: any){
    const attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, allowNull: false},
        passwordHash: {type: DataTypes.STRING, allowNull: false},
        title: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, allowNull: false},
        acceptTerms: {type: DataTypes.BOOLEAN, allowNull: false},
        verificationToken: {type: DataTypes.STRING},
        verified: {type: DataTypes.DATE},
        resetToken: {type: DataTypes.STRING},
        passwordReset: {type: DataTypes.DATE},
        created: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        updated: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        isVerified: {
            type: DataTypes.VIRTUAL,
            get() { return !!this.verified || !!this.passwordReset; }
        }
    };
    const options = {
        timestamps: false,
        defaultScope: {
            attributes: {exclude: ['passwordHash']}
        },
        scopes: {
            withHash: { attributes: {} }
        }
    };
    return sequelize.define('account', attributes, options);
}