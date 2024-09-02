import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"



interface CreateGymRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }

    async handle({
        description,
        latitude,
        longitude,
        phone,
        title
    }: CreateGymRequest): Promise<CreateGymResponse> {
        const gym = await this.gymsRepository.create({
            description,
            latitude,
            longitude,
            phone,
            title
        })

        return { gym }
    }
}