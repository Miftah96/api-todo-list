module.exports = app => {
    const activity  = require("../controllers/activity.controller.js");
    var router      = require("express").Router();
  
    router.post("/", activity.store);
    router.get("/", activity.getAll);
    router.get("/:id", activity.getOne);
    router.patch("/:id", activity.update);
    router.delete("/:id", activity.delete);

    app.use('/activity-groups', router);
  };