import { Router } from 'express';
import BuyerController from './app/controllers/BuyerController';
import ClientController from './app/controllers/ClientController';
import CardController from './app/controllers/CardController';
import PaymentsController from './app/controllers/PaymentsController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/buyers', BuyerController.store);
routes.post('/clients', ClientController.store);
routes.post('/cards', CardController.store);

routes.post('/payments', PaymentsController.store);
routes.put('/payments/:id', PaymentsController.update);
routes.get('/payments/:id', PaymentsController.index);

export default routes;
