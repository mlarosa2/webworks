const express    = require('express');
const path       = require('path');
const http       = require('http');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const crypto     = require('crypto');

const api = require('./server/routes/api');

const app = express();

// security
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server is up at localhost:3000');
});
