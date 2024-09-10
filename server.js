const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.listen(8080, () => {
  console.log('server listening on port 8080')
});

app.use(cors());

app.get('/', express.static(path.join(__dirname, 'client/build')));

app.get('/oauth/arcgis/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'oauth-callback.html'));
});
