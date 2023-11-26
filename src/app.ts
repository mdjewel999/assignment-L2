import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const project = 'Project is Running';
  res.send(project);
};


app.get('/', getAController);

export default app;