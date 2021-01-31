import React, {useState} from 'react';
import data from '../data/imogen.json'
import {Button, ButtonGroup, Modal} from 'react-bootstrap';

const RoleWrapper = ({ role, children }) => {
    const character = data.bio[role] || {};
    const [showBio, setShowBio] = useState(false);
    const [showCase, setShowCase] = useState(true);
    const [showTip, setShowTip] = useState(true);

    return (
        <React.Fragment>
            <div class="mb-2">
                <div class="card-body">
                    <span class="card-title h4 me-4">{ character.title }</span>
                    <ButtonGroup>
                        <Button variant="outline-primary" onClick={() => setShowBio(true)}>Bio</Button>
                        <Button variant="outline-primary" onClick={() => setShowCase(true)}>Case</Button>
                        <Button variant="outline-primary" onClick={() => setShowTip(true)}>Role</Button>
                    </ButtonGroup>
                </div>
            </div>
            {
                children
            }
            <Modal show={showTip} onHide={() => {setShowTip(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>{ character.title + " Tips" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ character.tip }</Modal.Body>
            </Modal>
            <Modal show={showBio} onHide={() => {setShowBio(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>{ character.title + " Bio" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ character.bio }</Modal.Body>
            </Modal>
            <Modal show={showCase} onHide={() => {setShowCase(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>{ data.briefTitle }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ data.briefDescription }</Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default RoleWrapper;