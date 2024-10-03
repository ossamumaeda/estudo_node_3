import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "@/repositories/check-ins-repository"
import { ResourceNotFound } from "./errors/resource-not-found"
import dayjs from "dayjs"
import { LateCheckInValidation } from "./errors/late-check-in-validation-error"

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

        const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )

        if(differenceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidation
        }

        checkIn.validated_at = new Date()

        this.checkInRepository.save(checkIn)

        return {checkIn}
    }
}