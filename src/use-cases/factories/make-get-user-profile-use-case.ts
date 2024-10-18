import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase(){ // Simplifies, when a dependecy is changed
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileteUseCase = new GetUserProfileUseCase(usersRepository)

    return getUserProfileteUseCase;
}