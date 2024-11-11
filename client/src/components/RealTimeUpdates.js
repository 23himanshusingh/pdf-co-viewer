// client/src/components/RealTimeUpdates.js
import React from 'react';
import useWebSocket from '../hooks/useWebSocket';

const RealTimeUpdates = () => {
    const { messages } = useWebSocket('ws://localhost:8080');

    return (
        <div>
            <h2>Real-Time Updates</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default RealTimeUpdates;