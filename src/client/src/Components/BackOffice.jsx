import React, { useState } from 'react';
import data from '../data/imogen.json'
import BackOfficeCabinet from "./BackOfficeCabinet";

function BackOffice(props) {
    const [article, selectArticle] = useState();

    if (article) {
        const selectedRecord = data.historicalRecords.find(({key}) => (key === article))
        return (
            <div>
                <h4>
                    {selectedRecord.title}
                </h4>
                <p>
                    {selectedRecord.body}
                </p>
                <button onClick={() => selectArticle(undefined)} class="btn btn-primary">Go Back</button>
            </div>
        )
    }

    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            <BackOfficeCabinet lowerEnd="A" upperEnd="D" />
            <BackOfficeCabinet lowerEnd="E" upperEnd="H" />
            <BackOfficeCabinet lowerEnd="I" upperEnd="L" />
            <BackOfficeCabinet lowerEnd="M" upperEnd="P" />
            <BackOfficeCabinet lowerEnd="Q" upperEnd="T" />
            <BackOfficeCabinet lowerEnd="U" upperEnd="Z" />
        </div>
    );
}

export default BackOffice;