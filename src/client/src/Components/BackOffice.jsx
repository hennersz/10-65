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
            <BackOfficeCabinet lowerEnd="A" upperEnd="D" selectArticle={selectArticle} />
            <BackOfficeCabinet lowerEnd="E" upperEnd="H" selectArticle={selectArticle} />
            <BackOfficeCabinet lowerEnd="I" upperEnd="L" selectArticle={selectArticle} />
            <BackOfficeCabinet lowerEnd="M" upperEnd="P" selectArticle={selectArticle} />
            <BackOfficeCabinet lowerEnd="Q" upperEnd="T" selectArticle={selectArticle} />
            <BackOfficeCabinet lowerEnd="U" upperEnd="Z" selectArticle={selectArticle} />
        </div>
    );
}

export default BackOffice;