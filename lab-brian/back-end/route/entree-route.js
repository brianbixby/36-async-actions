'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('entree:entree-route');
const createError = require('http-errors');
const Menu = require('../model/menu.js');
const Entree = require('../model/entree.js');

const entreeRouter = module.exports = new Router();

entreeRouter.get('/api/entrees', function(req, res, next) {
  debug('GET: /api/menu/entree');
  debug('asfasf');
  Entree.find()
    .then(console.log('res: ', res))
    .then( entree => res.json(entree))
    .catch( err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

// http POST :3000/api/menu/5a9ced3a6707472fa2474206/entree name=pizza price=20
entreeRouter.post('/api/menu/:menuID/entree', jsonParser, function(req, res, next) {
  debug('POST: /api/menu/:menuID/entree');
  if (!req.body.name) return next(createError(400, 'expected a request body name'));
  if (!req.body.price) return next(createError(400, 'expected a request body price'));

  Menu.findByIdAndAddEntree(req.params.menuID, req.body)
    .then ( entree => res.json(entree))
    .catch( err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

entreeRouter.put('/api/menu/:menuID/entree/:entreeID', jsonParser, function(req, res, next) {
  debug('PUT: /api/menu/:menuID/entree/:entreeID');
  if (!req.body.name || !req.body.price) return next(createError(400, 'expected a request body name and price'));

  Entree.findByIdAndUpdate(req.params.entreeID, req.body, {new: true})
    .then( entree => res.json(entree))
    .catch( err => {
      if(err.name === 'ValidationError') return next(err);
      next(createError(404, err.message));
    });
});

entreeRouter.get('/api/menu/:menuID/entree/:entreeID', function(req, res, next) {
  debug('GET: /api/menu/:menuID/entree/:entreeID');

  Entree.findById(req.params.entreeID)
    .then( entree => res.json(entree))
    .catch( err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

// http :3000/api/menu/:menuID/entree
entreeRouter.get('/api/menu/:menuID/entree', function(req, res, next) {
  debug('GET: /api/menu');

  Entree.find({ menuID: req.params.menuID })
    .then( entrees => res.json(entrees))
    .catch( err => next(err));
});

entreeRouter.delete('/api/entree/:menuID/:entreeID/', function(req, res, next) {
  debug('GET: /api/menu');
  const { menuID, entreeID } = req.params;

  Entree.findByIdAndRemove(entreeID)
    .then( () => Menu.findById(menuID))
    .then(menu => {
      if (!menu) throw createError(404);
      
      menu.entrees = menu.entrees.filter(entreeId => entreeId.toString() !== entreeID);
      return menu.save();
    })
    .then(() => res.sendStatus(204))
    .catch( err => next(err));
});
