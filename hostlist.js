import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHosts } from './hostsSlice';

const HostList = () => {
  const dispatch = useDispatch();
  const hosts = useSelector((state) => state.hosts.hosts);
  const hostStatus = useSelector((state) => state.hosts.status);

  useEffect(() => {
    if (hostStatus === 'idle') {
      dispatch(fetchHosts());
    }
    const intervalId = setInterval(() => dispatch(fetchHosts()), 10000); // Auto-refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, [hostStatus, dispatch]);

  return (
    <div className="grid">
      {hosts.map((host) => (
        <div key={host.name} className={`card ${host.status}`}>
          <h3>{host.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default HostList;
