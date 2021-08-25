const config = require('./config');
const Logger = require('./loaders/logger');
const https = require('https');
const path = require('path');
const fs = require('fs');
let serve;
let options;
const certsPath = path.join(__dirname, 'certs', 'server');

//
// SSL Certificates
//
options = {
  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem')),
  // This certificate should be a bundle containing your server certificate and any intermediates
  // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
  cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem')),
  // ca only needs to be specified for peer-certificates
  //, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
  requestCert: false,
  rejectUnauthorized: true
};

serve = https.createServer(options);

async function runServer() {
  const app = await require('./app')();

  serve.on('request', app);
  serve.listen(config.port, function() {
    Logger.info(`
        --------------------------------------------
          Server listening on port: ${config.port}
        --------------------------------------------
      `);
  });
}

runServer();
