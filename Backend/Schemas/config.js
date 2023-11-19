const Sequelize =require('sequelize');

const sequelize = new Sequelize(
  'todo',
  'root',
  '1437890',
  {
    host:'localhost',
    dialect:'mysql',
  })
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to Mysql');
  })
  .catch((error) => {
    console.error('Failed to connect to Mysql:', error);
  });
  
  
  module.exports = sequelize;






