const express = require('express');
const path = require('path');

const app = express();

const { PORT = 1337 } = process.env;

app.use(express.static(path.join(__dirname, '/app')));

app.get('/*', (req, res) => {
  console.log('-------');
  console.log(`${__dirname}/index.html`);
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT}/`);
});