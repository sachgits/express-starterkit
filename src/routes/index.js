const { Router } = require('express');

const users = require('./confirmation');

module.exports = () => {
  const routes = Router();
  users(routes);

  return routes;
};
