import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase(){ // Simplifies, when a dependecy is changed
    const usersRepository = new PrismaCheckInRepository();
    const fetchUserCheckInsHistory = new FetchUserCheckInHistoryUseCase(usersRepository)

    return fetchUserCheckInsHistory;
}