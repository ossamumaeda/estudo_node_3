import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins-history'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepo: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Check-in Use Cases', () => {

    beforeEach(async () => {
        checkInRepo = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInRepo)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('should be able to count check ins', async () => { // Unit test
        await checkInRepo.create({
            user_id:'user-1',
            gym_id: 'gym-id'
        })

        await checkInRepo.create({
            user_id:'user-1',
            gym_id: 'gym-id2'
        })

        const {checkInsCount} = await sut.handle({
            userId: 'user-1'
        })

        expect(checkInsCount).toEqual(2)
    })

    // test('should be able to fetch paginated history check-in history', async () => { // Unit test
        
    //     for(let i=0;i <= 22;i ++){
    //         await checkInRepo.create({
    //             user_id:'user-1',
    //             gym_id: `gym-id${i}`
    //         })
    //     }

    //     const {checkInsCount} = await sut.handle({
    //         userId: 'user-1'
    //     })

    //     expect(checkInsCount).toHaveLength(3)
    // })

})
