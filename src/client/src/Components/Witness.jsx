import data from '../data/imogen.json'
import React from "react";

const Witness = () => {
    return (
        <div>
            {
                data.witness.map(({ clue }) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{clue}</h5>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Witness