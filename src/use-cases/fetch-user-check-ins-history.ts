import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "@/repositories/check-ins-repository"

interface FetchUserCheckInHistoryUseCaseRequest {
    userId: string
    page:number
}

interface FetchUserCheckInHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
    constructor(
        private checkInRepository: CheckInRepository
    ) { }

    async handle({
        userId,
        page
    }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
        const checkIns = await this.checkInRepository.fetchManyByUserId(
            userId,
            page
        )

        return {checkIns}
    }
}