const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const { Server } = require('socket.io');
const serve = require('koa-static');
const mount = require('koa-mount');
const { createReadStream } = require('fs')
const PORT = process.env.PORT || 5000

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('./static/index.html');
});

app.use(cors());
app.use(mount('/static', serve('./static')));
app
  .use(router.routes())
  .use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = new Server(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
}})
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT)