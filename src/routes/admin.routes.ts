import { Router, Express } from 'express';
import { AdminController } from '../controllers';

const router = Router();
const adminController = new AdminController();

export function setAdminRoutes(app: Express) {
    app.use('/api/admin', router);
    
    router.post('/remove-all-reservations', adminController.removeAllReservations.bind(adminController));
    router.get('/users', adminController.getUsers.bind(adminController));
    router.get('/reservations', adminController.getReservations.bind(adminController));
    router.post('/remove-reservation', adminController.removeReservation.bind(adminController));
    router.post('/reset-password', adminController.resetPassword.bind(adminController));
    router.post('/remove-account', adminController.removeAccount.bind(adminController));
}
