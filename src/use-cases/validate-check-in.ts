import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "@/repositories/check-ins-repository"
import { ResourceNotFound } from "./errors/resource-not-found"

interface ValidateCheckinUseCaseRequest {
    checkInId: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(
        private checkInRepository: CheckInRepository
    ) { }

    async handle({
        checkInId
    }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
        const checkIn = await this.checkInRepository.findById(checkInId)
        
        if(!checkIn){
            throw new ResourceNotFound()
        }

        checkIn.validated_at = new Date()

        this.checkInRepository.save(checkIn)

        return {checkIn}
    }
}