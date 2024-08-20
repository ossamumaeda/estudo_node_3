import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentials } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(
        private userRepository: UsersRepository,
    ) { }

    async handle({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        // Find user by email
        // compare password hash with password in request
        const user = await this.userRepository.findByEmail(email)

        if (!user) { // Didn't find user by email
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }

        return {user}
    }
}