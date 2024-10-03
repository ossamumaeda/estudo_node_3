import { Gym, Prisma } from "@prisma/client";
import { findManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distante-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository{
    public items: Gym[] = []
    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            phone: data.phone ?? null,
            created_at: new Date()
        }

        this.items.push(gym)

        return gym
    }

    async findById(id: String) {
        const gym = this.items.find((item) => item.id === id)
        
        if(!gym){
            return null
        }

        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[] | []> {
        const gyms = this.items
            .filter((gym) => gym.title.includes(query))
            .slice((page-1) *20,page*20)

        return gyms;
    }

    async findManyNearby(params: findManyNearbyParams) {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                {latitude: params.latitude,longitude: params.longitude},
                {latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()}
            )
            return distance > 10
        })
    }

}