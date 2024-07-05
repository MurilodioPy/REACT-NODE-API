import { Router } from 'express';
import userController from '../controller/user.js';
import authMiddleware from '../middlewares/authMiddlewares.js'

const router = Router();

router.get('/', authMiddleware, userController.getAll);
router.post('/', userController.create);
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.deleteEntity);

export default router;
