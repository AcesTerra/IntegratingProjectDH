module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(50)
        },
        lastName: {
            type: dataTypes.STRING(100)
        },
        email:{
            type: dataTypes.STRING(50)
        },
        password: {
            type: dataTypes.STRING(255)
        },
        category:{
            type: dataTypes.STRING(50)
        },
        image: {
            type: dataTypes.STRING(50)
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const Users = sequelize.define(alias, cols, config);
    Users.associate =  function(models){
        Users.hasMany(models.Products,{
            as: 'products_user',
            foreignKey : 'id_user'
        })
    }
    return Users
}