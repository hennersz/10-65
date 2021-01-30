import React, { useEffect, useState } from 'react';
import { getSocket } from '../utils/socket';
import Game from './Game';
import {IN_GAME, IN_LOBBY, UNMATCHED} from "../constants";
import {ifDev} from "../utils/ifDev";

function Lobby(props) {
    const [gameState, setGameState] = useState(ifDev(IN_GAME, UNMATCHED))

    // useEffect(() => {
    //     getSocket().on('game_state_change', setGameState)
    // }, () => {
    //     getSocket().off('game_state_change', setGameState)
    // })
    
    switch (gameState) {
        case UNMATCHED:
            return (
                <div>
                    <h1>10-65</h1>
                    <h6>The co-operative police adventure game for 3 players and 1 witness.</h6>
                    <div className="d-flex flex-column align-items-center mt-2 mb-2">
                        <input disabled className="mb-2" placeholder="Lobby Name"></input>
                        <button>Join Game</button>
                    </div>
                </div>
            );
        case IN_LOBBY:
            return (
                <div>
                    <h1>Sit tight, the show will start soon.</h1>
                </div>
            )
        case IN_GAME:
            return (
                <Game />
            )
    }
}

export default Lobby;