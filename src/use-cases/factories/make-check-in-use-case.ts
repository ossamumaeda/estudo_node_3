import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckinUseCase } from "../checkin";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckinUseCase(){ // Simplifies, when a dependecy is changed
    const checkInRepository = new PrismaCheckInRepository();
    const gymsRepository = new PrismaGymsRepository();
    const getUserProfileteUseCase = new CheckinUseCase(checkInRepository,gymsRepository)

    return getUserProfileteUseCase;
}