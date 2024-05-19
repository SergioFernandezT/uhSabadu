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
        category_id: {
            type: DataTypes.INTEGER
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

    Product.associate = (models) => {
        Product.belongsTo(models.Category,{ as : 'categories', foreignKey : 'category_id'  })
    }

    return Product;
}