import React from 'react';
import data from "../data/imogen.json";

const getRecordsInAlphaRange = (lowerEnd, upperEnd) => {
    console.log(lowerEnd, upperEnd);
    return data.historicalRecords
        .filter(({ title }) => {
            const comparitorTitle = title.substr(0, 1).toUpperCase();
            return (comparitorTitle >= lowerEnd && comparitorTitle <= upperEnd)
        }).sort(({ title: titleA }, { title: titleB}) => {
            return titleA > titleB ? 1 : -1
        })
}

const BackOfficeCabinet = ({ lowerEnd, upperEnd, selectArticle }) => {
    const collapseID = 'cabinetCollapsable' + lowerEnd + upperEnd;
    const cabinetRecords = getRecordsInAlphaRange(lowerEnd, upperEnd);
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={"#" + collapseID}>
                    {
                        lowerEnd + ' to ' + upperEnd
                    }
                </button>
            </h2>
            <div id={collapseID} className="accordion-collapse collapse"
                 data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    {
                        cabinetRecords.length > 0 ?
                            (
                                cabinetRecords.map(({key, title, body, ...rest}) => (
                                    <button onClick={() => selectArticle(key)} className="btn btn-link m-2">
                                        {title}
                                    </button>
                                )
                            )
                        ) : (
                                <div>Nothing see here. Just an empty chocolate bar wrapper and some cobwebs</div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default BackOfficeCabinet;