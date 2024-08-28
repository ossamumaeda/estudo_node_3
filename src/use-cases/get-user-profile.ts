import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentials } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(
        private userRepository: UsersRepository,
    ) { }

    async handle({
        userId
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        // Find user by email
        // compare password hash with password in request
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFound()
        }

        return { user }
    }
}