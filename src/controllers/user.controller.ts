import { Request, Response } from 'express';
import { PrismaService } from '../services/prisma.service';

class UserController {
    constructor(private prismaService: PrismaService) {}

    async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const user = await this.prismaService.createUser({ name, email, password });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await this.prismaService.getUserById(parseInt(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const user = await this.prismaService.updateUser(parseInt(id), { name, email });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await this.prismaService.deleteUser(parseInt(id));
            if (user) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}

export default UserController;