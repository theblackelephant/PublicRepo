import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatus } from '../features/status/statusSlice';

const HostGrid = () => {
    const dispatch = useDispatch();
    const { hosts, status, error } = useSelector((state) => state.status);

    useEffect(() => {
        dispatch(fetchStatus());
        const intervalId = setInterval(() => dispatch(fetchStatus()), 5000); // Auto-refresh every 5 seconds
        return () => clearInterval(intervalId);
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {hosts.map((host) => (
                <div
                    key={host.host}
                    style={{
                        padding: '10px',
                        backgroundColor: host.status === 'up' ? 'green' : host.status === 'down' ? 'red' : 'grey',
                        color: 'white',
                        textAlign: 'center'
                    }}
                >
                    {host.host}
                </div>
            ))}
        </div>
    );
};

export default HostGrid;
