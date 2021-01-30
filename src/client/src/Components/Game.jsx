import React, { useState, useEffect } from 'react';
import { getSocket } from '../utils/socket';
import BackOffice from './BackOffice';
import RoleWrapper from './RoleWrapper';
import {ROLE_BACK_OFFICE, ROLE_DISPATCHER, ROLE_OFFICER, ROLE_WITNESS} from "../constants";
import Dispatcher from "./Dispatcher";

function Game(props) {
    const [role, setRole] = useState(ROLE_DISPATCHER)

    useEffect(() => {
        getSocket().on('role', setRole)
    }, () => {
        getSocket().off('role', setRole)
    })

    switch(role) {
        case ROLE_WITNESS:
            return (
                <RoleWrapper role="Younger Sister" bio="You are the key witness">
                    <h1>Witness</h1>
                </RoleWrapper>
            )
        case ROLE_DISPATCHER:
            return (
                <RoleWrapper role="Dispatcher" bio="Click the buttons, move the officer around." >
                    <Dispatcher />
                </RoleWrapper>
            )
        case ROLE_BACK_OFFICE:
            return (
                <RoleWrapper role="Back Office" bio="Holder of the intl, you know more about this town then everybody else. Yet this case confuses even you. Why not spend some time diving through the archive. But don't get too distracted, else you may miss an important clue from the rest of the team.">
                    <BackOffice />
                </RoleWrapper>
            )
        case ROLE_OFFICER: 
            return (
                <RoleWrapper role="Officer" bio="The stiff arm of the law." >
                    <h1>Officer Role</h1>
                </RoleWrapper>
            )
        default:
            return (
                <h1>Assigning Roles</h1>
            )
    }
}

export default Game;