import { Router } from 'express';
import activityController from '../controller/activity.js';
import authMiddleware from '../middlewares/authMiddlewares.js'


const router = Router();

router.get('/', authMiddleware, activityController.getAll);
router.post('/', authMiddleware, activityController.create);
router.put('/:id', authMiddleware, activityController.update);
router.delete('/:id', authMiddleware, activityController.deleteEntity);

export default router;
