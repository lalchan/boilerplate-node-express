import { createServer } from 'http';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import RequestHandler from './utils/responseHandler.js';
import cors from 'cors'
import mainRouter from './mainRouter.js';
import config from './config/env.js';
import corsOptions from './config/corsOptions.js';
import connectDB from './config/mongodb.js';
import { initializeApp } from './app.js';

connectDB();

const app = initializeApp();

const port = config.getInstance().port || '3000';

app.set('port', port);

app.listen(port);

app.on('listening', () => {
	console.log(`Listening on port: http://localhost:${port}/`);
});

