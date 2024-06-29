const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

// Replace with your Prometheus URL and query
const PROMETHEUS_URL = 'http://your-prometheus-server/api/v1/query';
const PROMETHEUS_QUERY = 'up{job="your_job"}';

app.get('/status', async (req, res) => {
  try {
    const response = await axios.get(PROMETHEUS_URL, {
      params: {
        query: PROMETHEUS_QUERY,
      },
    });

    const status = response.data.data.result[0].value[1];
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Prometheus' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
