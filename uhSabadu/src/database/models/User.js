module.exports = (sequelize, DataTypes) => {
    let alias = "User"
    let cols = {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        phone_prefix: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
    
        // createdAt: {
        //     type: DataTypes.DATE
        // },
        // updatedAt: {
        //     type: DataTypes.DATE
        // },
    }
    let config = {
        tableName: 'users',
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}