import express from 'express';
import * as userController from '../controllers/user-controller';

const router = express.Router();

router.get('/user/:id', userController.getUser);
router.post('/user', userController.postUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/users', userController.searchUsers);

export default router;
