module.exports = (sequelize, DataTypes) => {
    let alias = "Category"
    let cols = {
        name: {
            type: DataTypes.STRING
        },
    }
    let config = {
        tableName: 'categories',
        timestamps: false,
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Product,{ as : 'products', foreignKey : 'category_id'  })
    }

    return Category;
}