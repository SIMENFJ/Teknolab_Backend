import { Router, Express } from 'express';
import { AuthController } from '../controllers';

const router = Router();
const authController = new AuthController();

export function setAuthRoutes(app: Express) {
    app.use('/api/auth', router);
    
    router.post('/login', authController.login.bind(authController));
    router.post('/register', authController.register.bind(authController));
}
