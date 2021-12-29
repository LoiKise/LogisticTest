import React from 'react'
import MessengerCustomerChat from 'react-messenger-customer-chat';



export default function Chatbox() {
    return (
        <div className="message">
            <MessengerCustomerChat 
                pageId="101401255565164"
                appId="399972415032380"
            />
        </div>
    )
}
