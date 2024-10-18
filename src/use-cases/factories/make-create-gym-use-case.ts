import { CreateGymUseCase } from "../create-gym";
import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase(){ // Simplifies, when a dependecy is changed
    const gymsrepository = new PrismaGymsRepository();
    const useCase = new CreateGymUseCase(gymsrepository)

    return useCase;
}