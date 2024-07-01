// src/features/status/StatusCard.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatus } from './statusSlice';

const StatusCard = ({ host }) => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.status[host]);

    const handleClick = () => {
        dispatch(fetchStatus(host));
    };

    const getStatusColor = () => {
        if (status === 'up') return 'green';
        if (status === 'down') return 'red';
        return 'gray';
    };

    return (
        <div
            onClick={handleClick}
            style={{
                border: `1px solid ${getStatusColor()}`,
                padding: '20px',
                margin: '10px',
                cursor: 'pointer',
            }}
        >
            <h3>Host: {host}</h3>
            <p>Status: {status}</p>
        </div>
    );
};

export default StatusCard;
