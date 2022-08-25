import React, { useState, useRef} from 'react'
import { useAuth } from '../auth';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';
import ChatMessage from './components/ChatMessage'

const ChatRoom = () => {
    const {userId} = useAuth();
    const messageRef = collection(db, 'Messages');
    const q = query(messageRef, orderBy('createdAt'), limit(25));
    const [messages] = useCollectionData(q, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const sendMessage = async(e)=>{
        e.preventDefault(); 
        await addDoc(userMessagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid: userId,
          });
        setFormValue('');   
        dummy.current.scrollIntoView({behavior: 'smooth'})  

    }
    const dummy = useRef();

    return (<>
        <main>
    
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    
          <span ref={dummy}></span>
    
        </main>
    
        <form onSubmit={sendMessage}>
    
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
    
          <button type="submit" disabled={!formValue}>🕊️</button>
    
        </form>
      </>)
}

export default ChatRoom;