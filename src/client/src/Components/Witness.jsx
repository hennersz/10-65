import data from '../data/imogen.json'
import React from "react";

const CLUE_DELAY = 3;

const Witness = ({minutes}) => {
    return (
        <div>
            {
                data.witness.map(({ clue }, index) => {
                    if (index * CLUE_DELAY <= (minutes + CLUE_DELAY)) {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{clue}</h5>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{"This will be revealed in " + (index * CLUE_DELAY - (minutes + CLUE_DELAY)) + " minutes" }</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Witness