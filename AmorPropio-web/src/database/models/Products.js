module.exports = (sequelize, dataTypes) =>{
    let alias = 'Products';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        colors: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        price:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        id_user: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: 'product',
        timestamps: false
    };
    const Products = sequelize.define(alias, cols, config)
    Products.associate =  function(models){
        Products.belongsTo(models.Category,{
            as: 'category',
            foreignKey : 'id_category'
        })

        Products.belongsTo(models.Users,{
            as: 'users',
            foreignKey : 'id_user'
        })
    }
    return Products
}