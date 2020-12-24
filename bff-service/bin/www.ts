import http from 'http';
import application from '../app';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'})
process.on('unhandledRejection', (error, p) => {
  console.log(error)
})
.on('uncaughtException', error => {
  console.log(error)
  process.exit(1);
});

const app = application()
const port = normalizePort(process.env.PORT || '3001');
console.log(process.env.cart)
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
  const parsedPort = parseInt(val, 10);
  if (isNaN(parsedPort)) {
    return val;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return false;
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;


  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  const addr: any = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}