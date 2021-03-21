const Sequelize = require('sequelize');
const Todo = require('../models').Todo;

module.exports = {
 create(req, res) {
    return Todo
        .create ({
             name: req.body.name,
             title: req.body.title,
             completed: req.body.completed
        })
        .then(Todo => res.status(200).send(Todo))
        .catch(error => res.status(400).send(error))
 },
 list(_, res) {
     return Todo.findAll({})
        .then(Todo => res.status(200).send(Todo))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {
     return Todo.findByPk(req.params.id)
     .then(Todo => res.status(200).send(Todo))
     .catch(error => res.status(400).send(error))
  },
  update (req, res, put) {
    return Todo.findByPk(req.params.id)
    .then((todo) => {
      console.log('todo: ',todo)
      todo.completed = req.body.completed
      if (put) {
        todo.name = req.body.name
        todo.title = req.body.title
      }
      todo.save()
        .then(Todo => res.status(200).send(Todo))
        .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))
   },
  delete (req, res) {
      return Todo.destroy({
          where: {
              id: req.params.id,
          }
      })
      .then(Todo => res.status(200).send(Todo))
      .catch(error => res.status(400).send(error))
   },
};
