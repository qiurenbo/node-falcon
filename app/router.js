"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  // position
  router.post(
    "/api/v1/upload/positions/:year/:province_id",
    app.controller.v1.position.upload
  );
  router.resources("/api/v1/positions", app.controller.v1.position);

  // enrollment
  router.post(
    "/api/v1/upload/enrollments/:year/:province_id",
    app.controller.v1.enrollment.upload
  );
  router.resources("/api/v1/enrollments", app.controller.v1.enrollment);

  // authentication
  router.post("/api/v1/login", app.controller.v1.auth.login);
  router.post("/api/v1/register", app.controller.v1.auth.register);
};
