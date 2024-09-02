import { hash } from "bcryptjs"
import { CheckIn, User } from "@prisma/client"
import { CheckInRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFound } from "./errors/resource-not-found"
import { getDistanceBetweenCoordinates } from "@/utils/get-distante-between-coordinates"
import { MaxNumberOfCheckIns } from "./errors/max-number-of-check-ins-error"
import { MaxDistance } from "./errors/max-distance-error"

interface CheckinUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private gymsRepository: GymsRepository
    ) { }

    async handle({
        gymId, userId, userLatitude,userLongitude
    }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)
        if(!gym){
            throw new ResourceNotFound()
        }

        // Calculate distance between user and the gym
        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude,longitude: userLongitude},
            {latitude: gym.latitude.toNumber(),longitude: gym.longitude.toNumber()}
        )
        const MAX_DISTANCE_IN_KILOMETERS = 0.1
        if(distance > MAX_DISTANCE_IN_KILOMETERS ){ // 100 meters
            throw new MaxDistance()
        }

        const checkInOnSameDate = await this.checkInRepository.findUserIdOnDate(
            userId,
            new Date()
        )
        
        if(checkInOnSameDate){
            throw new MaxNumberOfCheckIns()
        }
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {checkIn}
    }
}