const { auth } = require("../middleware");

module.exports = app => {

  const loginloggerController = require("../controllers/loginlogger.controller.js");

  var router = require("express").Router();

  router.get("/show/login/logger", [auth.verifyToken], loginloggerController.showLoginLogger);

  app.use('/api', router);
};