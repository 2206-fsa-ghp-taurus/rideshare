import React from 'react'
import { useAuth } from '../auth';

const ChatMessage = (props) => {
    const {userId} = useAuth();
    const {text, uid} = props.message;
    const messageClass = uid === userId ? "sent": "received";
    return (
        <>
            <div className = {`message ${messageClass}`}>
                <p> {text} </p>
            </div>   
        </>
    )
}

export default ChatMessage;