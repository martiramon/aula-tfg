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

  app.post("/api/test", [authJwt.verifyToken], controller.nouTest);

  app.get("/api/aula/test/:aulaId", controller.testAula);
  app.get(
    "/api/test/respostes/:testId",
    [authJwt.verifyToken],
    controller.testRespostes
  );
  app.get("/api/test/:testId", [authJwt.verifyToken], controller.testId);

  app.post("/api/resposta", controller.novaResposta);
};
