const ROLE_OFFICER = 'ROLE_OFFICER';
const ROLE_BACK_OFFICE = 'ROLE_BACK_OFFICE';
const ROLE_WITNESS = 'ROLE_WITNESS';
const ROLE_DISPATCHER = 'ROLE_DISPATCHER';

const ROLES = [ROLE_OFFICER, ROLE_DISPATCHER, ROLE_WITNESS, ROLE_BACK_OFFICE]

class GameServer {
  constructor(io) {
    this.io= io;
    this.availableRoles = [...ROLES]
    this.takenRoles = {}
    io.on('connection', this.connect.bind(this))
  }

  connect(socket) {
    console.log('connected')
    const role = this.availableRoles.pop()
    if(role) {
      this.takenRoles[socket.id] = role
      socket.emit('game_state_change', {state: 'IN_LOBBY', role: role})
    } else {
      socket.emit('game_state_change', {state: 'UNMATCHED', msg: 'no roles available'})
    }
  }

  disconnect(socket) {
    this.availableRoles.push(this.takenRoles[socket.id])
    delete this.takenRoles[socket.id]
  }

  reset() {
    console.log('resetting')
    this.availableRoles = [...ROLES]
  }
}

module.exports = GameServer