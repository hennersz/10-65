import data from "../data/imogen.json";
import React from "react";
import { getSocket } from "../utils/socket";
import { MOVE_EVENT } from "../constants";
import {useState} from "react";
import Loader from "./Loader";
import {Button} from "react-bootstrap";

const Dispatcher = () => {
    const [isOfficerMoving, setOfficerMoving] = useState(false);

    const bindOnLocationSelect = locationKey => () => {
        getSocket().emit(MOVE_EVENT, locationKey);
        setOfficerMoving(true);
        setTimeout(() => {setOfficerMoving(false)}, 3000);
    }

    if (isOfficerMoving) {
        return (
            <Loader label="Officer is on the move!" />
        )
    }

    return (
        <div>
            {
                data.locations.map(({ key, name, description }) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">
                                {description}
                            </p>
                            <Button variant="primary" onClick={bindOnLocationSelect(key)} class="mt-2">
                                Move Officer Here
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Dispatcher;