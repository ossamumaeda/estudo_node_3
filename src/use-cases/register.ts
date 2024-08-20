import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { User } from "@prisma/client"
import { UserAlreadyExists } from "./errors/user-already-exists"

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository){}

    async handle({email, name, password }: RegisterUseCaseRequest) : Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.userRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExists()
        }

        const user = await this.userRepository.create({ email, name, password_hash })

        return {
            user,
        }
    }
}