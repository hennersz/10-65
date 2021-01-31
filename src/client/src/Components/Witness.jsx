import data from '../data/imogen.json'
import React from "react";

const Witness = ({minutes}) => {
    return (
        <div>
            {
                data.witness.map(({ clue }, index) => {
                    if (index <= (minutes + 1)) {
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
                                <h5 className="card-title">{"This will be revealed in " + (index - (minutes + 1)) + " minutes" }</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Witness