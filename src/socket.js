const ROLE_OFFICER = 'ROLE_OFFICER';
const ROLE_BACK_OFFICE = 'ROLE_BACK_OFFICE';
const ROLE_WITNESS = 'ROLE_WITNESS';
const ROLE_DISPATCHER = 'ROLE_DISPATCHER';

const ROLES = [ROLE_OFFICER, ROLE_DISPATCHER, ROLE_WITNESS, ROLE_BACK_OFFICE]

class GameServer {
  constructor(socket) {
    this.socket = socket;
    this.roles = [...ROLES]

    socket.on('connection', this.connect.bind(this))
  }

  connect(socket) {
    console.log('connected')
    const role = this.roles.pop()
    if(role) {
      socket.emit('game_state_change', 'IN_GAME')
      socket.emit('role', role)
    } else {
      socket.emit('game_state_change', 'UNMATCHED')
    }
  }

  reset() {
    console.log('resetting')
    this.roles = [...ROLES]
  }
}

module.exports = GameServer