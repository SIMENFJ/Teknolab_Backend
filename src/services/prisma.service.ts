import { PrismaClient, User } from '@prisma/client';

export class PrismaService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // User methods
    async getUserById(id: number) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    async getAllUsers() {
        return await this.prisma.user.findMany();
    }

    async createUser(data: { name: string; email: string, password?: string }) {
        return await this.prisma.user.create({
            data: {
                ...data,
                password: data.password || ''
            },
        });
    }

    async updateUser(id: number, data: { name?: string; email?: string }) {
        return await this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async updateUserPassword(email: string, password: string) {
        return await this.prisma.user.update({
            where: { email },
            data: { password },
        });
    }

    async deleteUser(id: number) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }

    async deleteUserByEmail(email: string) {
        return await this.prisma.user.delete({
            where: { email },
        });
    }

    // Reservation methods
    async getAllReservations() {
        return await this.prisma.reservation.findMany();
    }

    async getReservationsByUser(userEmail: string) {
        return await this.prisma.reservation.findMany({
            where: { userEmail },
        });
    }

    async createReservation(data: { date: string; slot: string; userEmail: string }) {
        return await this.prisma.reservation.create({
            data,
        });
    }

    async deleteReservation(date: string, slot: string) {
        return await this.prisma.reservation.delete({
            where: { date_slot: { date, slot } },
        });
    }

    async deleteAllReservationsForUser(userEmail: string) {
        return await this.prisma.reservation.deleteMany({
            where: { userEmail },
        });
    }
}