import { Request, Response } from 'express';
import { PrismaService } from '../services/prisma.service';

export class ReservationController {
    private prismaService: PrismaService;

    constructor() {
        this.prismaService = new PrismaService();
    }

    async getReservations(req: Request, res: Response) {
        try {
            const reservations = await this.prismaService.getAllReservations();
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching reservations' });
        }
    }

    async createReservation(req: Request, res: Response) {
        const { date, slot, email } = req.body;
        try {
            const reservation = await this.prismaService.createReservation({ date, slot, userEmail: email });
            res.status(201).json(reservation);
        } catch (error) {
            res.status(500).json({ error: 'Error creating reservation' });
        }
    }

    async deleteReservation(req: Request, res: Response) {
        const { date, slot } = req.body;
        try {
            await this.prismaService.deleteReservation(date, slot);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting reservation' });
        }
    }

    async getUserReservations(req: Request, res: Response) {
        const { userEmail } = req.params;
        try {
            const reservations = await this.prismaService.getReservationsByUser(userEmail);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user reservations' });
        }
    }
}
