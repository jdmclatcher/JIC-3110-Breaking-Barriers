'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "./Messages.css";

const MessagesPage = () => {
    const { data: session } = useSession();
    const user = session?.session?.user;
    const role = user.role;

    const [messageList, setMessageList] = useState([
        {textContent: 'hello. this is a test.', createdAt: '12-2-2023 6:24 PM', instructorId:'instructor', resolved:false},
        {textContent: 'resolve that previous message.', createdAt: '12-2-2023 5:30 PM', instructorId:'instructor1', resolved:false},
        {textContent: 'hello. i will be resolved.', createdAt: '12-2-2023 5:12 PM', instructorId:'instructor1', resolved:true}
    ]);

    const handleResolve = () => {
        console.log(user.per_id);
    }

    useEffect(() => {
        console.log(role)
    }, []);   


    return (
        <div className='messages-container'>
            <Link href="/dashboard">Back to Dashboard</Link>
            <h1 className='messges-header'>Messages</h1>
            <div className='messages-list'>
                {messageList.map((message, idx) => {
                    return (
                        <div className='message-item' key={`message-${idx}`}>
                            <h2>{message.instructorId}</h2>
                            <p className='message-text'>{message.textContent}</p>
                            <h2 className='message-date'>{message.createdAt}</h2>
                            <button
                                className='resolve-message-button'
                                onClick={() => {handleResolve(message.message_id)}}
                            >
                                Resolve
                            </button>
                        </div>
                    )
                })}
            </div>
            {role === 'instructor' && 
                <div className='create-message-container'>
                    TODO: Message form goes here                   
                </div>      
            }
        </div>
    )
}

export default MessagesPage