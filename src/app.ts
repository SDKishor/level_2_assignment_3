import express from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandeler from './app/errors/globalErrorHandeler';
import notFound from './app/middlewares/notFounds';
import cookieParser from 'cookie-parser';

const app = express();

//perser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandeler);

app.use(notFound);

export default app;
