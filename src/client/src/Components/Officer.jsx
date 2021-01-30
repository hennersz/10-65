import data from "../data/imogen.json";
import {useEffect, useState} from "react";
import Chat from "./Chat";
import { getSocket } from "../utils/socket";
import { HANDLE_MOVE_EVENT } from "../constants";

const Officer = () => {
    const [currentKey, setLocation] = useState();
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

    if (peeps.find(({ key }) => (key === personKey))) {
        return (
            <Chat personKey={personKey} onClose={() => { setPerson() }} />
        )
    }

    return (
        <div>
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