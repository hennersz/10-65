const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');
const { Server } = require('socket.io');
const serve = require('koa-static');
const mount = require('koa-mount');
const { createReadStream } = require('fs')

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('./static/index.html');
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(mount('/static', serve('./static')));

const server = http.createServer(app.callback());
const io = new Server(server)
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000)