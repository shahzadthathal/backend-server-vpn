'use strict';
var bcrypt = require("bcryptjs");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static createAdmin(){

      this.findOne({ where: {username: 'admin'} }).then(user => {
        if(!user){
          let userObj = {
            username: 'admin',
            password: bcrypt.hashSync('secret8pin', 8),
            role: 1,
            first_name: 'Admin',
            last_name: 'VPN',
            email: 'admin@example.com',
            role: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          this.create(userObj)
        }
      })
    }

  };
  User.init({
    //username: DataTypes.STRING,
    username: { type: DataTypes.STRING, allowNull: false, unique: true, 
      validate: {len: [2, 50]} 
    },
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,  
    last_name: DataTypes.STRING,  
    email: DataTypes.STRING, 
    role: {type: DataTypes.BOOLEAN, defaultValue:2},
    status:{type: DataTypes.BOOLEAN, defaultValue:1},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    // indexes: [ 
    //   {unique: true, name: 'username_index',using: 'BTREE',fields: ['username']},
    // ], 
    modelName: 'User',
    tableName: 'users',
  });

  //User.createAdmin();

  return User;
};

