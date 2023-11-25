import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-users', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.put('/:userId', UserControllers.updateUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.addNewProductToOrder);

router.get('/:userId/orders', UserControllers.getAllOrdersForUser);

router.get(
  '/:userId/orders/total-price',
  UserControllers.calculateTotalPriceForUser,
);

export const UserRoutes = router;
