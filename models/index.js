'use strict';

const Redis = require('ioredis')
const redis = new Redis()
const RedisAdaptor = require('sequelize-transparent-cache-ioredis')
const redisAdaptor = new RedisAdaptor({
  client: redis,
  namespace: 'model',
  lifetime: 60 * 60  //1 hour
})
const sequelizeCache = require('sequelize-transparent-cache')
const { withCache } = sequelizeCache(redisAdaptor)

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'production' //'development';

const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//disable query logging in console
sequelize.options.logging = false


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Fix the wrong count issue in findAndCountAll()
sequelize.addHook('beforeCount', function (options) {
  if (this._scope.include && this._scope.include.length > 0) {
    options.distinct = true
    options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`
  }
  if (options.include && options.include.length > 0) {
    options.include = null
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.users = require("./user.js")(sequelize, Sequelize);
db.user_login_logger = withCache(require("./userloginlogger.js")(sequelize, Sequelize));

//Define Models Relations
db.users.hasMany(db.user_login_logger, {foreignKey: 'user_id', as: "user_login_logger" });
//db.	user_login_logger.belongsTo(db.users, {as: "user"});


module.exports = db;
