import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase(){ // Simplifies, when a dependecy is changed
    const gymsrepository = new PrismaGymsRepository();
    const useCase = new SearchGymUseCase(gymsrepository)

    return useCase;
}