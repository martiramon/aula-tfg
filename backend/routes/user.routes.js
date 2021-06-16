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

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/professor",
    [authJwt.verifyToken],
    controller.professorBoard
  );

  app.get("/api/aules", [authJwt.verifyToken], controller.professorAules);

  app.post("/api/aulanova", [authJwt.verifyToken], controller.novaAula);

  app.get(
    "/api/alumnes/:aulaId",
    [authJwt.verifyToken],
    controller.aulaAlumnes
  );

  app.post("/api/alumnenou", [authJwt.verifyToken], controller.nouAlumne);

  app.get("/api/alumnesAula/:aulaCodi", controller.alumnesCodi);

  app.delete(
    "/api/eliminarAlumne/:alumneId",
    [authJwt.verifyToken],
    controller.eliminarAlumne
  );
};
