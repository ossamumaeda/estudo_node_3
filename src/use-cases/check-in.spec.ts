import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './checkin'

let checkInRepo: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Check-in Use Cases', () => {

    beforeEach(() => {
        checkInRepo = new InMemoryCheckInsRepository()
        sut = new CheckinUseCase(checkInRepo)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('should be able to check in', async () => { // Unit test
        const { checkIn } = await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    // red -> green -> refactor
    test('should not be able to check in twice in the same day', async () => { // Unit test
        vi.setSystemTime(new Date(2022,0,20,8,0,0))
        
        await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        await expect(() => sut.handle({
            gymId: 'gym-id',
            userId: 'user-id'
        })).rejects.toBeInstanceOf(Error)

    })

    test('should be able to check in twice but in different days', async () => { // Unit test
        vi.setSystemTime(new Date(2022,0,20,8,0,0))
        
        await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        vi.setSystemTime(new Date(2022,0,21,8,0,0))

        const {checkIn} = await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id'
        })
        expect(checkIn.id).toEqual(expect.any(String))

    })

})
