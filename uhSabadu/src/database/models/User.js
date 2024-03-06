module.exports = (sequelize, DataTypes) => {
    let alias = "User"
    let cols = {
        name: {
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