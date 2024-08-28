import { Prisma, User } from "@prisma/client";
import { prisma } from "lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async create(data:Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        return user
    }
}