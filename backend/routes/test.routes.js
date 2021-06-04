const { authJwt } = require("../middlewares");
const controller = require("../controllers/test.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/testnou", [authJwt.verifyToken], controller.nouTest);

  app.get("/api/testAula/:aulaId", controller.testAula);
};
