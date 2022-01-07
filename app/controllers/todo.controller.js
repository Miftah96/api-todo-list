const db        = require("../model");
const Todo      = db.todo;
const Query     = db.Sequelize.Op;
const log       = 'Todo controller';
const service   = 'Todo';
const parseResponse = require("../utils/response.helper.js")

exports.store = (req, res) => {
  if (!req.body.title) {
    let result = parseResponse.badRequest('title')
    res.status(400).send(result)
  }
  
  if (!req.body.activity_group_id) {
    let result = parseResponse.badRequest('activity_group_id')
    res.status(400).send(result)
  }

  const todo = {
    title: req.body.title,
    activity_group_id: req.body.activity_group_id,
    is_active: true,
    priority: "very-high"
  };

  Todo.create(todo)
    .then(data => {
      console.log(`│  ├── ${log} :: insert :: insert`);
      let result = parseResponse.created(data)
      res.status(201).send(result)
    })
    .catch(err => {
      console.log(`│  ├── ${log} :: insert :: error`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
};

exports.getAll = (req, res) => {
  const activity_group_id   = req.query.activity_group_id;
  var condition             = activity_group_id ? { activity_group_id: { [Query.like]: `%${activity_group_id}%` } } : null;

  Todo.findAll({ where: condition })
    .then(data => {
      let result = parseResponse.success(data)
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Activitys."
      });
    });
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if (data) {
        let result = parseResponse.success(data)
        res.send(result)
      } else {
        let result = parseResponse.notFound(service, id)
        res.status(404).send(result);
      }
    })
    .catch(err => {
      let result = parseResponse.notFound(service, id)
      res.status(404).send(result);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.title) {
    let result = parseResponse.badRequest('title')
    res.status(400).send(result)
  }
  
  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        let result = parseResponse.success(data)
        res.send(result)
      } else {
        let result = parseResponse.notFound(service, id)
        res.send(result)
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          let result = parseResponse.success({})
          res.send(result)
        } else {
          let result = parseResponse.notFound(service, id)
          res.status(404).send(result);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Todo with id=" + id
        });
      });
};