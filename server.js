const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get('http://your-prometheus-server/api/v1/query', {
            params: {
                query: 'your_prometheus_query'
            }
        });

        const data = response.data.data.result.map(host => ({
            host: host.metric.instance,
            status: host.value[1] // Assuming the status is part of the query response
        }));

        res.json(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
