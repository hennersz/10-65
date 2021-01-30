import React from 'react';
import BackOffice from './BackOffice';
import RoleWrapper from './RoleWrapper';
import {ROLE_BACK_OFFICE, ROLE_DISPATCHER, ROLE_OFFICER, ROLE_WITNESS} from "../constants";
import Dispatcher from "./Dispatcher";
import Witness from "./Witness";
import Officer from "./Officer";

function Game({role}) {
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