import {useState, useRef, useEffect} from "react";
import data from '../data/imogen.json';

const Chat = ({ personKey, onClose }) => {
    const [messageIndex, setMessageIndex] = useState(0)
    const person = data.people.find(({key}) => key === personKey);

    const messageEndRef = useRef(null);

    if (!person) {
        onClose()
    }

    const isSendDisabled = (person.conversation.length < messageIndex) || (messageIndex % 2 == 1);
    const userMessage = messageIndex % 2 == 0 ? person.conversation[messageIndex] : 'Waiting for reply';
    const onUserSendMessage = () => {
        console.log(messageEndRef.current)
        setMessageIndex(messageIndex + 1)
        setTimeout(() => {
            setMessageIndex(messageIndex + 2)
        }, 1500 )
    }

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    })

    return (
        <div className="d-flex flex-column" style={{"max-height": "70vh"}}>
            <h6>You are talking to {person.title}</h6>
            <div className="flex-grow-1 d-flex flex-column" style={{"overflow-y": "scroll"}}>
                {
                    person.conversation.filter((message, index) => index < messageIndex).map(
                        (message, index) => {
                            const isPlayerMessage = index % 2 == 0
                            const alignClass = isPlayerMessage ? 'align-self-end bg-dark' : 'align-self-start bg-success'
                            return (
                                <div className={alignClass + ' m-2 card text-white'}>
                                    <div className="m-1">
                                        {message}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
                <div ref={messageEndRef} />
            </div>
            <div className="p-2">
                <div className="input-group">
                    <textarea className="form-control" value={userMessage}></textarea>
                    <button onClick={onUserSendMessage} disabled={isSendDisabled} className="btn btn-secondary">
                        Send
                    </button>
                    <button onClick={onClose} className="btn btn-primary">
                        Exit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;