var express = require('express');
var router = express.Router();

const todoControl = require('../controles/todo');


/* GET todos entire list. */
router.get('/', function(req, res, next) {
  todoControl.list(req,res)
});

/* GET specific todo */
router.get('/:id', function(req, res, next) {
  todoControl.find(req,res)
});

/* POST new todo */
router.post('/', function (req, res) {
  todoControl.create(req,res)
});

/* UPDATE specific todo*/
router.put('/:id', function (req, res) {
  todoControl.update(req,res, true)
});

/* PATCH specific todo*/
router.patch('/:id', function (req, res) {
  todoControl.update(req,res, false)
});

/* DELETE specific TODO*/
router.delete('/:id', function (req, res) {
  todoControl.delete(req,res)
});
module.exports = router;
