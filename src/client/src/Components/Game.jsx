import React, { useState, useEffect } from 'react';
import { getSocket } from '../utils/socket';
import BackOffice from './BackOffice';
import RoleWrapper from './RoleWrapper';
import {ROLE_BACK_OFFICE, ROLE_DISPATCHER, ROLE_OFFICER, ROLE_WITNESS} from "../constants";
import Dispatcher from "./Dispatcher";
import Witness from "./Witness";
import Officer from "./Officer";

console.warn('NODE_ENV', process.env.NODE_ENV);

function Game(props) {
    const [role, setRole] = useState(ROLE_WITNESS)

    useEffect(() => {
        getSocket().on('role', setRole)
    }, () => {
        getSocket().off('role', setRole)
    })

    switch(role) {
        case ROLE_WITNESS:
            return (
                <RoleWrapper role={role}>
                    <Witness />
                </RoleWrapper>
            )
        case ROLE_DISPATCHER:
            return (
                <RoleWrapper role={role}>
                    <Dispatcher />
                </RoleWrapper>
            )
        case ROLE_BACK_OFFICE:
            return (
                <RoleWrapper role={role}>
                    <BackOffice />
                </RoleWrapper>
            )
        case ROLE_OFFICER: 
            return (
                <RoleWrapper role={role}>
                    <Officer />
                </RoleWrapper>
            )
        default:
            return (
                <h1>Assigning Roles</h1>
            )
    }
}

export default Game;