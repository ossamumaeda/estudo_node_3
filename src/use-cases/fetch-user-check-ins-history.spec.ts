import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistance } from './errors/max-distance-error'
import { MaxNumberOfCheckIns } from './errors/max-number-of-check-ins-error'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepo: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Check-in Use Cases', () => {

    beforeEach(async () => {
        checkInRepo = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInHistoryUseCase(checkInRepo)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('should be able to fetch history check-in history', async () => { // Unit test
        await checkInRepo.create({
            user_id:'user-1',
            gym_id: 'gym-id'
        })

        await checkInRepo.create({
            user_id:'user-1',
            gym_id: 'gym-id2'
        })

        const {checkIns} = await sut.handle({
            userId: 'user-1',
            page:1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: 'gym-id'}),
            expect.objectContaining({gym_id: 'gym-id2'})
        ])
    })

    test('should be able to fetch paginated history check-in history', async () => { // Unit test
        
        for(let i=0;i <= 22;i ++){
            await checkInRepo.create({
                user_id:'user-1',
                gym_id: `gym-id${i}`
            })
        }

        const {checkIns} = await sut.handle({
            userId: 'user-1',
            page:2
        })

        expect(checkIns).toHaveLength(3)
    })

})
