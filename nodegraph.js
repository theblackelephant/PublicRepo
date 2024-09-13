const express = require('express');
const app = express();

app.get('/graph-data', (req, res) => {
  const data = {
    nodes: [
      { id: '1', label: 'Node 1', title: 'This is node 1' },
      { id: '2', label: 'Node 2', title: 'This is node 2' },
    ],
    edges: [
      { from: '1', to: '2', label: 'Edge between 1 and 2' },
    ],
  };
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
