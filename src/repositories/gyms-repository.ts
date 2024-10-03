import { Prisma, Gym } from "@prisma/client";

export interface findManyNearbyParams{
    latitude: number
    longitude:number
}

export interface GymsRepository{
    create(data:Prisma.GymCreateInput) : Promise<Gym>
    findById(gymId: String): Promise <Gym | null>
    searchMany(query:string,page:number) : Promise <Gym[] | []>
    findManyNearby(params:findManyNearbyParams): Promise <Gym[] | []> 
}