import React from 'react';
import data from "../data/imogen.json";
import {Button, Accordion, Card} from "react-bootstrap";

const getRecordsInAlphaRange = (lowerEnd, upperEnd) => {
    console.log(lowerEnd, upperEnd);
    return data.historicalRecords
        .filter(({title}) => {
            const comparitorTitle = title.substr(0, 1).toUpperCase();
            return (comparitorTitle >= lowerEnd && comparitorTitle <= upperEnd)
        }).sort(({title: titleA}, {title: titleB}) => {
            return titleA > titleB ? 1 : -1
        })
}

const BackOfficeCabinet = ({lowerEnd, upperEnd, selectArticle}) => {
    const collapseID = 'cabinetCollapsable' + lowerEnd + upperEnd;
    const cabinetRecords = getRecordsInAlphaRange(lowerEnd, upperEnd);
    return (
        <div>
            <Accordion.Toggle as={Card.Header} eventKey={collapseID}>
                {
                    lowerEnd + ' to ' + upperEnd
                }
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={collapseID}>
                <div className="d-flex flex-column">
                    {
                        cabinetRecords.length > 0 ?
                            (
                                cabinetRecords.map(({key, title, body, ...rest}) => (
                                        <Button variant="primary mt-1" onClick={() => selectArticle(key)}>
                                            {title}
                                        </Button>
                                    )
                                )
                            ) : (
                                <div className="m-1">Nothing see here. Just an empty chocolate bar wrapper and some cobwebs</div>
                            )
                    }
                </div>
            </Accordion.Collapse>
        </div>
    )
}

export default BackOfficeCabinet;