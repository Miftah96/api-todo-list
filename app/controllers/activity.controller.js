const db        = require("../model");
const Activity  = db.activity;
const Query     = db.Sequelize.Op;
const log       = 'Activity controller';
const service   = 'Activity';
const parseResponse = require("../utils/response.helper.js")

exports.store = (req, res) => {
  if (!req.body.title) {
    let result = parseResponse.badRequest('title')
    res.status(400).send(result)
  }

  const activity = {
    title: req.body.title,
    email: req.body.email
  };

  Activity.create(activity)
    .then(data => {
      console.log(`│  ├── ${log} :: insert :: insert`);
      let result = parseResponse.created(data)
      res.status(201).send(result)
    })
    .catch(err => {
      console.log(`│  ├── ${log} :: insert :: error`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Activity."
      });
    });
};

exports.getAll = (req, res) => {
  const title   = req.query.title;
  var condition = title ? { title: { [Query.like]: `%${title}%` } } : null;

  Activity.findAll({ where: condition })
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

  Activity.findByPk(id)
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
  
  Activity.update(req.body, {
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
        message: "Error updating Activity with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Activity.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Activity was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Activity with id=" + id
      });
    });
};