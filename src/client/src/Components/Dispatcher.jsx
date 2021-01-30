import data from "../data/imogen.json";
import React from "react";

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
                            <button onClick={() => window.alert('Change location to ' + key)} class="btn btn-primary mt-2">Move Officer Here</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Dispatcher;