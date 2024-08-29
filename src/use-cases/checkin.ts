import { hash } from "bcryptjs"
import { CheckIn, User } from "@prisma/client"
import { CheckInRepository } from "@/repositories/check-ins-repository"

interface CheckinUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
    constructor(private checkInRepository: CheckInRepository) { }

    async handle({
        gymId, userId
    }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {checkIn}
    }
}