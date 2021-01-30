import React, { useState } from 'react';
import data from '../data/imogen.json'

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
        <div>
            {
                data.historicalRecords.map(({ key, title, body, ...rest }) => (
                    <button onClick={() => selectArticle(key)} class="btn btn-primary mt-2">{title}</button>
                ))
            }
        </div>
    );
}

export default BackOffice;