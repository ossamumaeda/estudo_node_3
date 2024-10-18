import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-ins-history";
import { ValidateCheckinUseCase } from "../validate-check-in";

export function makeFetchUserCheckInsHistoryUseCase(){ // Simplifies, when a dependecy is changed
    const checkInrepository = new PrismaCheckInRepository();
    const useCase = new ValidateCheckinUseCase(checkInrepository)

    return useCase;
}