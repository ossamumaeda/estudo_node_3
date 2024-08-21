import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = registerBodySchema.parse(request.body)
    const registerUseCase = makeRegisterUseCase();
    try{
        await registerUseCase.handle({
            name,
            email,
            password
        })
    }
    catch(err){
        if(err instanceof UserAlreadyExists){
            return reply.status(409).send({message:err.message})
        }

        throw err
    }

    return reply.status(201).send()
}
