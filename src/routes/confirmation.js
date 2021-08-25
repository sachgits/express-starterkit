const { Router } = require('express');
const axios = require('axios').default;
// This dependency allows us to avoid the UnhandledPromiseRejectionWarning
const asyncHandler = require('express-async-handler');
const Logger = require('../loaders/logger');
const UserService = require('@app/services/users');

const route = Router();

module.exports = async function(routes) {
  routes.use('/confirmation', route);

  route.get(
    '/',
    // eslint-disable-next-line no-unused-vars
    asyncHandler(async (req, res, next) => {
      const filters = req.query;
      const users = await UserService.find(filters);
      res.status(200).json(users);
    })
  );

  route.post(
    '/',
    // eslint-disable-next-line no-unused-vars
    asyncHandler(async (req, res, next) => {
      const payRequest = req.query;
      Logger.info('before http request to killbill with axios');
      axios({
        url: 'http://killbill:8080/plugins/{plugin-name}/Confirmation',
        method: 'post',
        data: payRequest,
        headers: { 'X-Killbill-ApiKey': 'bob', 'X-Killbill-ApiSecret': 'lazar', 'X-Killbill-CreatedBy': 'Admin' },
        auth: { username: 'admin', password: 'password' }
      })
        .then(function(response) {
          Logger.info('SUCCESS went and cameback with no error');
          res.status(200).json(response);
        })
        .catch(function(error) {
          Logger.error('something went wrong with axios http request');
          res.status(500).json(error);
        });
    })
  );
};
