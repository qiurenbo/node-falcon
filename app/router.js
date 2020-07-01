"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.post(
    "/api/v1/upload/positions/:year/:provinceId",
    app.controller.v1.position.upload
  );
  router.resources("/api/v1/positions", app.controller.v1.position);
};
