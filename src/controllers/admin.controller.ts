import { Request, Response } from 'express';
import { PrismaService } from '../services/prisma.service';

async function isAdmin(prismaService: PrismaService, email: string): Promise<boolean> {
    const user = await prismaService.getUserByEmail(email);
    return user?.admin === true;
}

export class AdminController {
    private prismaService: PrismaService;

    constructor() {
        this.prismaService = new PrismaService();
    }

    async removeAllReservations(req: Request, res: Response) {
        const { adminEmail, userEmail } = req.body;
        if (!await isAdmin(this.prismaService, adminEmail)) return res.status(403).json({ error: 'Kun administratorer har tilgang.' });
        try {
            const result = await this.prismaService.deleteAllReservationsForUser(userEmail);
            res.json({ success: true, removed: result.count });
        } catch (error) {
            res.status(500).json({ error: 'Error removing reservations' });
        }
    }

    async getUsers(req: Request, res: Response) {
        const { adminEmail } = req.query;
        if (!await isAdmin(this.prismaService, adminEmail as string)) return res.status(403).json({ error: 'Kun administratorer har tilgang.' });
        try {
            const users = await this.prismaService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async getReservations(req: Request, res: Response) {
        const { adminEmail } = req.query;
        if (!await isAdmin(this.prismaService, adminEmail as string)) return res.status(403).json({ error: 'Kun administratorer har tilgang.' });
        try {
            const reservations = await this.prismaService.getAllReservations();
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching reservations' });
        }
    }

    async removeReservation(req: Request, res: Response) {
        const { adminEmail, date, slot } = req.body;
        if (!await isAdmin(this.prismaService, adminEmail)) return res.status(403).json({ error: 'Kun administratorer har tilgang.' });
        try {
            await this.prismaService.deleteReservation(date, slot);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error removing reservation' });
        }
    }

    async resetPassword(req: Request, res: Response) {
        const { adminEmail, userEmail, newPassword } = req.body;
        if (!await isAdmin(this.prismaService, adminEmail)) return res.status(403).json({ error: 'Kun administratorer har tilgang.' });
        try {
            await this.prismaService.updateUserPassword(userEmail, newPassword);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error resetting password' });
        }
    }

    async removeAccount(req: Request, res: Response) {
        const { adminEmail, userEmail } = req.body;
        if (!await isAdmin(this.prismaService, adminEmail)) return res.status(403).json({ error: 'Kun administratorer har tilgang.' });
        try {
            await this.prismaService.deleteUserByEmail(userEmail);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error removing account' });
        }
    }
}
