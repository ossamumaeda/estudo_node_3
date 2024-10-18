import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase(){ // Simplifies, when a dependecy is changed
    const gymsrepository = new PrismaGymsRepository();
    const useCase = new FetchNearbyGymsUseCase(gymsrepository)

    return useCase;
}