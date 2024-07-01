const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.get('/api/status/:host', async (req, res) => {
    const host = req.params.host;
    try {
        const response = await axios.get(`http://your-prometheus-server/api/v1/query`, {
            params: {
                query: `up{instance="${host}"}`,
            },
        });
        const status = response.data.data.result[0]?.value[1] === '1' ? 'up' : 'down';
        res.json({ status });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error querying Prometheus');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
