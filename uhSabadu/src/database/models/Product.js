module.exports = (sequelize, DataTypes) => {
    let alias = "Product"
    let cols = {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(4,2)
        },
        discount: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        image: {
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
        tableName: 'products',
        timestamps: false,
    }

    const Product = sequelize.define(alias, cols, config);

    return Product;
}