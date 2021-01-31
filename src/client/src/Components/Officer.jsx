import data from "../data/imogen.json";
import {useEffect, useState} from "react";
import Chat from "./Chat";
import { getSocket } from "../utils/socket";
import {HANDLE_MOVE_EVENT, IN_GAME, UNMATCHED} from "../constants";
import {ifDev} from "../utils/ifDev";
import {Button, Card} from "react-bootstrap";

const Officer = () => {
    const [currentKey, setLocation] = useState(ifDev('pier'));
    const [personKey, setPerson] = useState();

    useEffect(() => {
        getSocket().on(HANDLE_MOVE_EVENT, setLocation)
    }, () => {
        getSocket.off(HANDLE_MOVE_EVENT, setLocation)
    })
    if (!currentKey) {
        return (
            <h6 className="m-4">No time to waste. Ask your dispatcher to send you somewhere.</h6>
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
                peeps.length == 0 && (
                    <h6 className="m-4">It appears that nobody is here.</h6>
                )
            }
            {
                peeps.map(({ key, title, description }) => (
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>
                            <Button onClick={() => setPerson(key)} variant="primary">Talk To</Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
}

export default Officer;