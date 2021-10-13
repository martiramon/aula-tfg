const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /* API DE PROVA PEL TOKEN D'AUTENTIFICACIÓ

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/professor",
    [authJwt.verifyToken],
    controller.professorBoard
  );
  */

  app.get("/api/aules", [authJwt.verifyToken], controller.professorAules);

  app.post("/api/aula", [authJwt.verifyToken], controller.novaAula);

  app.get(
    "/api/aules/alumnes/:aulaId",
    [authJwt.verifyToken],
    controller.aulaAlumnes
  );

  app.post("/api/alumne", [authJwt.verifyToken], controller.nouAlumne);

  app.get("/api/aules/alumnes/codi/:aulaCodi", controller.alumnesCodi);

  app.delete(
    "/api/alumne/:alumneId",
    [authJwt.verifyToken],
    controller.eliminarAlumne
  );
  app.delete(
    "/api/aula/:aulaId",
    [authJwt.verifyToken],
    controller.eliminarAula
  );
};
