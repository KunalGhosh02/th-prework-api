import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { v1Router } from './routes/v1';
import { handleError } from './middlewares/error-handler';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1', v1Router);

app.use('/healthcheck', (_req, res) => {
  return res.sendStatus(200);
});

app.use(handleError);
