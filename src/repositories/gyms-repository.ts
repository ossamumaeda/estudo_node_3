import { Prisma, Gym } from "@prisma/client";

export interface GymsRepository{
    create(data:Prisma.GymCreateInput) : Promise<Gym>
    findById(gymId: String): Promise <Gym | null>
}