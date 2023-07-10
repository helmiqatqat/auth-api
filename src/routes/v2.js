'use strict';
const express = require('express');
const dataModules = require('../models/ index');
const v2Routes = express.Router();
const bearer = require('../auth/middleware/ bearer');
const acl = require('../auth/middleware/acl');


v2Routes.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});
v2Routes.get('/api/v2', bearer, v2Handler);
v2Routes.post('/api/v2', bearer, acl('create'),v2CreateHandler);
v2Routes.put('/api/v2', bearer, acl('update'),v2UpdateHander);
v2Routes.delete('/api/v2', bearer, acl('delete'), v2DeleteHandler);


function v2Handler(req, res) {
    res.status(200).json('you have the access');
}

function v2CreateHandler(req, res) {
    res.status(201).json('you can Create');
}

function v2UpdateHander(req, res) {
    res.status(200).json('you can update');
}

function v2DeleteHandler(req, res) {
    res.status(200).json('you can delete');
}



module.exports = v2Routes;
