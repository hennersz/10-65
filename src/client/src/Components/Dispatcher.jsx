import data from "../data/imogen.json";
import React from "react";
import { getSocket } from "../utils/socket";
import { MOVE_EVENT } from "../constants";

const Dispatcher = () => {
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
                            <button onClick={() => getSocket().emit(MOVE_EVENT, key)} class="btn btn-primary mt-2">Move Officer Here</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Dispatcher;