const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

// Replace with your Prometheus URL
const prometheusUrl = 'http://your-prometheus-server/api/v1/query';

// Example hosts
const hosts = ['host1', 'host2', 'host3'];

// Function to query Prometheus
const getHostStatus = async (host) => {
  const query = `up{instance="${host}"}`;
  try {
    const response = await axios.get(prometheusUrl, { params: { query } });
    if (response.data.data.result.length > 0) {
      return 'green'; // Host is up
    } else {
      return 'red'; // Host is down
    }
  } catch (error) {
    console.error(`Error querying Prometheus for ${host}:`, error);
    return 'grey'; // Error in querying
  }
};

app.get('/api/hosts', async (req, res) => {
  const statuses = await Promise.all(hosts.map(getHostStatus));
  const result = hosts.map((host, index) => ({ host, status: statuses[index] }));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
