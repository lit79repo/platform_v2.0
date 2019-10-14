/**
 * @name Backend
 * @description Backend part of school platform
 */
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const { ParseServer } = require('parse-server');

const app = express();
const api = new ParseServer({
	databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
	appId: 'lit79',
	masterKey: 'key', // Keep this key secret!
	fileKey: 'optionalFileKey',
	serverURL: 'http://localhost:3000/api'
});

app.use(morgan('combined'));
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));
app.use('/api', api);
app.use(express.static("dist"));

app.listen(3000);