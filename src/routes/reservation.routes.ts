import { Router, Express } from 'express';
import { ReservationController } from '../controllers';

const router = Router();
const reservationController = new ReservationController();

export function setReservationRoutes(app: Express) {
    app.use('/api/reservations', router);
    
    router.get('/', reservationController.getReservations.bind(reservationController));
    router.post('/', reservationController.createReservation.bind(reservationController));
    router.delete('/', reservationController.deleteReservation.bind(reservationController));
    router.get('/user/:userEmail', reservationController.getUserReservations.bind(reservationController));
}
