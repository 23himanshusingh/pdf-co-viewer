// client/src/App.js
import React, { useState } from 'react';
import Admin from './components/Admin';
import Viewer from './components/Viewer';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleRoleChange = (role) => {
        setIsAdmin(role === 'admin');
    };

    return (
        <div>
            <h1>WebSocket Application</h1>
            <button onClick={() => handleRoleChange('admin')}>Login as Admin</button>
            <button onClick={() => handleRoleChange('viewer')}>Login as Viewer</button>
            {isAdmin ? <Admin /> : <Viewer />}
        </div>
    );
};

export default App;