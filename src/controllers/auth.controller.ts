import { Request, Response } from 'express';
import { PrismaService } from '../services/prisma.service';

export class AuthController {
    private prismaService: PrismaService;

    constructor() {
        this.prismaService = new PrismaService();
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await this.prismaService.getUserByEmail(email);
            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Ugyldig e-post eller passord.' });
            }
            res.json({
                message: 'Innlogging vellykket.',
                user: {
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                },
            });
        } catch (error) {
            res.status(500).json({ error: 'En feil oppstod under innlogging.' });
        }
    }

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const existingUser = await this.prismaService.getUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: 'En bruker med denne e-posten finnes allerede.' });
            }
            const user = await this.prismaService.createUser({ name, email, password });
            res.status(201).json({
                message: 'Bruker registrert.',
                user: {
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                },
            });
        } catch (error) {
            res.status(500).json({ error: 'En feil oppstod under registrering.' });
        }
    }
}
