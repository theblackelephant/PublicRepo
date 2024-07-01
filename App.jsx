\// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import StatusCard from './features/status/StatusCard';

function App() {
    const hosts = ['host1', 'host2', 'host3'];

    return (
        <Provider store={store}>
            <div className="App">
                <h1>Host Status</h1>
                {hosts.map((host) => (
                    <StatusCard key={host} host={host} />
                ))}
            </div>
        </Provider>
    );
}

export default App;
