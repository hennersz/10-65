const {
  ROLE_OFFICER,
  ROLE_DISPATCHER,
  ROLE_BACK_OFFICE, 
  ROLE_WITNESS, 
  IN_GAME,
  IN_LOBBY,
  UNMATCHED,
  GAME_FULL,
  MOVE_EVENT,
  HANDLE_MOVE_EVENT
} = require('../client/src/constants')
const ROLES = [ROLE_OFFICER, ROLE_DISPATCHER, ROLE_WITNESS, ROLE_BACK_OFFICE]
const EventEmitter = require('events')

class GameServer extends EventEmitter {
  constructor(io) {
    super()
    this.io = io
    this.availableRoles = [...ROLES]
    this.takenRoles = {}
    io.on('connection', this.connect.bind(this))
  }

  connect(socket) {
    console.log('connected')
    const role = this.availableRoles.pop()
    if(role) {
      this.assignRole(socket, role)
    } else {
      console.log('no roles available')
      socket.emit('game_state_change', GAME_FULL)
    }
  }

  assignRole(socket, role) {
    console.log('assigning role')
    let roleObj
    switch (role) {
      case ROLE_DISPATCHER:
        roleObj = new Dispatcher(this, socket)    
        this.takenRoles[socket.id] = roleObj
        break;
      case ROLE_OFFICER:
        roleObj = new Officer(this, socket)    
        this.takenRoles[socket.id] = roleObj
        break;
      case ROLE_WITNESS:
        roleObj = new Witness(this, socket)    
        this.takenRoles[socket.id] = roleObj
        break;
      case ROLE_BACK_OFFICE:
        roleObj = new BackOffice(this, socket)    
        this.takenRoles[socket.id] = roleObj
        break;
    }
    const disconnectFn = this.disconnect.bind(this)
    socket.on('disconnect', ()=>{
      disconnectFn(socket)
    })
    socket.on('start', this.start.bind(this))
    socket.emit('game_state_change', IN_LOBBY)
    socket.emit('set_role', role)
  }

  disconnect(socket) {
    console.log('disconnected')
    this.availableRoles.push(this.takenRoles[socket.id].name)
    delete this.takenRoles[socket.id]
  }

  start(){
    this.io.sockets.emit('game_state_change',IN_GAME)
  }

  reset() {
    console.log('resetting')
    this.availableRoles = [...ROLES]
  }
}

class Role {
  constructor(gs, socket, name) {
    this.gameServer = gs
    this.socket = socket
    this.name = name
  }
}

class Officer extends Role{
  constructor(gs, socket) {
    super(gs, socket, ROLE_OFFICER)
    this.gameServer.on(HANDLE_MOVE_EVENT, this.handleMove.bind(this))
  }

  handleMove(location) {
    this.socket.emit(HANDLE_MOVE_EVENT, location)
  }
}

class Dispatcher extends Role{
  constructor(gs, socket) {
    super(gs, socket, ROLE_DISPATCHER)

    this.socket.on(MOVE_EVENT, this.handleMove.bind(this))
  }
  handleMove(location) {
    this.gameServer.emit(HANDLE_MOVE_EVENT, location)
  }
}

class Witness extends Role{
  constructor(gs, socket) {
    super(gs, socket, ROLE_WITNESS)
  }
}

class BackOffice extends Role {
  constructor(gs, socket) {
    super(gs, socket, ROLE_BACK_OFFICE)
  }
}

module.exports = GameServer