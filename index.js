import { createServer } from 'http';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import RequestHandler from './utils/responseHandler.js';
import cors from 'cors'
import mainRouter from './mainRouter.js';
import config from './config/env.js';
import corsOptions from './config/corsOptions.js';

// uncomment if needed create file
// import connectDB from './config/mongodb.js';
// import SendGrid from '@sendgrid/mail';
// connectDB();


const app = express();

/** Create HTTP server. */
const server = createServer(app);

// Get port from environment and store in Express.


if (config.getInstance().env !== 'prod') app.use(logger('dev'))

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions))

const port = config.getInstance().port || '3000';

app.set('port', port);
// implementing request handler
app.use('*', RequestHandler.init);

// implementing routes
app.use('/api', mainRouter);

// handle other requests with a 404
app.use('*', (req, res) => {
	if (req.headers) console.log(`A stray request came from ${req.headers['user-agent']} `)
	return res.failCase({
		message: "Endpoint doesn't exist."
	}, 404)
});

// Listen on provided port, on all network interfaces. 
server.listen(port);

// Event listener for HTTP server "listening" event.
server.on('listening', () => {
	console.log(`Listening on port: http://localhost:${port}/`);
});

