import express from 'express';
import cors from 'cors';
import mainRouer from 'v1/routes/main.route.js';
import RequestHandler from 'utils/responseHandler.js';
import logger from 'morgan';
import { json, urlencoded } from 'express';
import { corsOptions } from 'config/corsOptions.js';

export const initializeApp = () =>{
    const app = express();
    
    if(config.getInstance().env !== 'prod') {
        app.use(logger('dev'))
    }
    
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cors(corsOptions));
    app.use('*', RequestHandler.init);
    app.use('/api', mainRouter);

    return app;
}