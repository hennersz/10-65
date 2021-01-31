import React, { useEffect, useState } from 'react';
import { getSocket } from '../utils/socket';
import Game from './Game';
import {
    IN_GAME,
    IN_LOBBY,
    UNMATCHED,
    GAME_FULL,
    GAME_WIN,
    ROLE_OFFICER,
    ROLE_DISPATCHER,
    ROLE_BACK_OFFICE,
    ROLE_WITNESS,
} from "../constants";
import {ifDev} from "../utils/ifDev";
import Logo from "./Logo";

const Lobby = () => {
    const [gameState, setGameState] = useState(ifDev(GAME_WIN, UNMATCHED))
    const [ role, setRole] = useState(ifDev(ROLE_OFFICER, 'none'))
    const [minutes, setMinutes] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setMinutes(seconds => seconds + 1);
            }, 60000);
        } else if (!isTimerActive && minutes !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, minutes]);

    useEffect(() => {
        if (gameState === IN_GAME) {
            setIsTimerActive(true);
        }
        if (gameState === GAME_WIN) {
            setIsTimerActive(false);
        }
    }, [gameState])

    useEffect(() => {
        getSocket().on('game_state_change', setGameState)
        getSocket().on('set_role', setRole)
    }, () => {
        getSocket().off('game_state_change', setGameState)
        getSocket.off('set_role', setRole)
    })
    
    switch (gameState) {
        case UNMATCHED:
            getSocket().emit('ready')
            return (
                <div>
                    <Logo />
                    <h6>Waiting to connect to an empty game.</h6>
                </div>
            );
        case IN_LOBBY:
            return (
                <div>
                    <Logo/>
                    <h3>Sit tight, the show will start soon. You are the {role}</h3>
                    <h3>Remember your police training.</h3>
                    <h5>Investigate Out Loud</h5>
                    <p>You and your role are unique. Nobody else can see what you are seeing. Share key information clearly.</p>
                    <h5>Listen and Help Others</h5>
                    <p>No case can be closed by a single officer working alone. Others may say clues that may help your investigations.</p>
                    <h5>Witness Protection</h5>
                    <p>Be nice to the witness, they may remember things that will help you.</p>
                    <h5>Keep Notes</h5>
                    <p>Clues can come from anywhere, it may be useful to take notes.</p>
                    <div className="d-flex flex-column align-items-center mt-2 mb-2">
                        <button onClick={()=>{getSocket().emit('start')}}>Start Game</button>
                    </div>
                </div>
            )
        case IN_GAME:
            return (
                <div>
                    <Game minutes={minutes} role={role}/>
                    <div className="mt-2">{minutes + ' minutes into the investigation.'}</div>
                </div>
            )
        case GAME_FULL:
            return (
                <h1>The game is full right now, sorry :/</h1>
            )
        case GAME_WIN:
            return (
                <div>
                    <Logo/>
                    <h1>Congrats you closed the case!</h1>
                    <h2>{minutes + ' minutes'}</h2>
                </div>
            )
    }
}

export default Lobby;