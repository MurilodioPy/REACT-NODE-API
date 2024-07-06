import { Router } from 'express';
import categoryController from '../controller/category.js'; 
import authMiddleware from '../middlewares/authMiddlewares.js'

const router = Router();

router.get('/', authMiddleware, categoryController.getAll);
router.get('/', authMiddleware, categoryController.getById);
router.post('/', authMiddleware, categoryController.create);
router.put('/:id', authMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, categoryController.deleteEntity);

export default router;
