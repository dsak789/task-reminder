const { DataTypes } = require("sequelize");
const sequelize = require("./config");

const User= sequelize.define('users',{
    userid:{
        type:DataTypes.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    fname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profilepath:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'users',
    timestamps:false
});

module.exports = User