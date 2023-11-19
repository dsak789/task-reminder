const {  DataTypes } = require("sequelize");
const sequelize = require("./config");
 
const Alltask =sequelize.define('Alltasks',
{
    taskid:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    task:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    completed:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"Not Completed"
    }
},{
    tableName:'alltasks',
    freezeTableName:true,
    timstamps:false
} );

module.exports = Alltask;
