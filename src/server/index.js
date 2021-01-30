const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const { Server } = require('socket.io');
const serve = require('koa-static');
const mount = require('koa-mount');
const { createReadStream } = require('fs')
const PORT = process.env.PORT || 5000
const GameServer = require('./socket')

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('./src/client/build/index.html');
}).get('/reset', (ctx) => {
  ctx.gameServer.reset()
  ctx.body = 'reset'
});

app.use(cors());
app.use(serve('./src/client/build/'));
app
  .use(router.routes())
  .use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = new Server(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
}})

const gs = new GameServer(io)
app.context.gameServer = gs


server.listen(PORT)