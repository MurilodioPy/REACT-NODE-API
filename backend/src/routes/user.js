import { Router } from 'express';
import userController from '../controller/user.js';
import authMiddleware from '../middlewares/authMiddlewares.js'

const router = Router();

router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.deleteEntity);

export default router;
