import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { AppDataSource } from './data-source';
import helmet from 'helmet';
import authRouter from './routes/auth';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    const port = process.env.PORT || 3001;

    // Middlewares
    app.use(cors());
    app.use(helmet());

    // Use body-parser for parsing JSON and URL-encoded bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Router
    app.use('/api/auth', authRouter);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
