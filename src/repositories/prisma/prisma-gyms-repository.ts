import { CheckIn, Gym, Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { findManyNearbyParams, GymsRepository } from "../gyms-repository";
import dayjs from "dayjs";

export class PrismaGymsRepository implements GymsRepository {
    async create(data: Prisma.GymCreateInput){
        const gym = prisma.gym.create({
            data
        })
        return gym
    }
    async findById(gymId: string) {
        const gym = prisma.gym.findUnique({
            where:{
                id:gymId
            }
        })
        return gym
    }
    async searchMany(query: string, page: number) {
        const gyms = prisma.gym.findMany({
            where:{
                title: {
                    contains: query
                }
            }
        })
        return gyms
    }
    async findManyNearby({latitude, longitude}: findManyNearbyParams) {
        const gyms = prisma.$queryRaw<Gym[]>`
            SELECT * 
            FROM gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) 
            * cos( radians( latitude ) ) 
            * cos( radians( longitude ) - radians(${longitude}) ) 
            + sin( radians(${latitude}) ) 
            * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }

}