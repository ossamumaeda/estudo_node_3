import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentials } from "@/use-cases/errors/invalid-credentials-error"

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const { email, password } = authenticateBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository();
    const authenticateUser = new AuthenticateUseCase(usersRepository)
    try {
        await authenticateUser.handle({
            email,
            password
        })
    }
    catch (err) {
        if (err instanceof InvalidCredentials) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }

    return reply.status(200).send()
}
