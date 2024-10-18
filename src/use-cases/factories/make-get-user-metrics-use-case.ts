import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase(){ // Simplifies, when a dependecy is changed
    const usersRepository = new PrismaCheckInRepository();
    const getUserMetricsUseCase = new GetUserMetricsUseCase(usersRepository)

    return getUserMetricsUseCase;
}