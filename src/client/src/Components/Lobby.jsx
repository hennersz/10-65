import React, { useEffect, useState } from 'react';
import { getSocket } from '../utils/socket';
import Game from './Game';
import {IN_GAME, IN_LOBBY, UNMATCHED, GAME_FULL} from "../constants";

function Lobby(props) {
    const [gameState, setGameState] = useState(UNMATCHED)
    const [ role, setRole] = useState('none')

    useEffect(() => {
        getSocket().on('game_state_change', setGameState)
    }, () => {
        getSocket().off('game_state_change', setGameState)
    })

    useEffect(() => {
        getSocket().on('set_role', setRole)
    }, () => {
        getSocket.off('set_role', setRole)
    })
    
    switch (gameState) {
        case UNMATCHED:
            return (
                <div>
                    <h1>10-65</h1>
                    <h6>The co-operative police adventure game for 3 players and 1 witness.</h6>
                </div>
            );
        case IN_LOBBY:
            return (
                <div>
                    <h1>Sit tight, the show will start soon. You are the {role}</h1>

                    <div className="d-flex flex-column align-items-center mt-2 mb-2">
                        <button onClick={()=>{getSocket().emit('start')}}>Start Game</button>
                    </div>
                </div>
            )
        case IN_GAME:
            return (
                <Game role={role}/>
            )
        case GAME_FULL:
            return (
                <div>
                    <h1>The game is full right now, sorry :/</h1>
                </div>
            )
    }
}

export default Lobby;