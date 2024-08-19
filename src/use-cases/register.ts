import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { prisma } from "lib/prisma"
import { UserAlreadyExists } from "./errors/user-already-exists"

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository){}

    async handle({email, name, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.userRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExists()
        }

        await this.userRepository.create({ email, name, password_hash })
    }
}