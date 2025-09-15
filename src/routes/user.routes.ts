import { Router, Express } from 'express';
import UserController from '../controllers/user.controller';
import { PrismaService } from '../services/prisma.service';

const router = Router();
const userController = new UserController(new PrismaService());

export function setUserRoutes(app: Express) {
    app.use('/api/users', router);
    
    router.post('/', userController.createUser.bind(userController));
    router.get('/:id', userController.getUser.bind(userController));
    router.put('/:id', userController.updateUser.bind(userController));
    router.delete('/:id', userController.deleteUser.bind(userController));
}