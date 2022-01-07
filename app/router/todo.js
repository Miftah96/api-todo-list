module.exports = app => {
    const todo  = require("../controllers/todo.controller.js");
    var router      = require("express").Router();
  
    router.post("/", todo.store);
    router.get("/", todo.getAll);
    router.get("/:id", todo.getOne);
    router.patch("/:id", todo.update);
    router.delete("/:id", todo.delete);

    app.use('/todo-items', router);
  };