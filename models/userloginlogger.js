'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLoginLogger extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserLoginLogger.init({
    user_id: DataTypes.INTEGER,
    login_date: DataTypes.DATEONLY,
    login_device: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  //{ indexes: [ {fields: ['user_id', 'login_date', 'login_device','country' ] } ] }, 
  {
    sequelize,
    indexes: [ 
      //{fields: ['user_id' ] },
      //{fields: ['login_date' ] },
      //create named index
      {name: 'user_id_index',using: 'BTREE',fields: ['user_id']},
      {name: 'login_date_index',using: 'BTREE',fields: ['login_date']},
      {name: 'login_device_index',using: 'BTREE',fields: ['login_device']},
      {name: 'country_index',using: 'BTREE',fields: ['country']},

    ],

    timestamps: false,
    modelName: 'UserLoginLogger',
    freezeTableName: true,
    tableName: 'user_login_logger',
    

  });
  return UserLoginLogger;
};