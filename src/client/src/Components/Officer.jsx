import data from "../data/imogen.json";
import {useEffect, useState} from "react";
import Chat from "./Chat";
import { getSocket } from "../utils/socket";
import {HANDLE_MOVE_EVENT, IN_GAME, UNMATCHED} from "../constants";
import {ifDev} from "../utils/ifDev";

const Officer = () => {
    const [currentKey, setLocation] = useState(ifDev('barrowwoods'));
    const [personKey, setPerson] = useState();

    useEffect(() => {
        getSocket().on(HANDLE_MOVE_EVENT, setLocation)
    }, () => {
        getSocket.off(HANDLE_MOVE_EVENT, setLocation)
    })
    if (!currentKey) {
        return (
            <h6>No time to waste. Ask your dispatcher to send you somewhere.</h6>
        )
    }

    const peeps = data.people.filter(({location}) => (location == currentKey));
    const location = data.locations.find(({key}) => key === currentKey);

    if (peeps.find(({ key }) => (key === personKey))) {
        return (
            <Chat personKey={personKey} onClose={() => { setPerson() }} />
        )
    }

    return (
        <div>
            <h6>You are currently at {location.name}</h6>
            {
                peeps.map(({ key, title, description }) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">
                                {description}
                            </p>
                            <button onClick={() => setPerson(key)} class="btn btn-primary mt-2">Talk To</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Officer;