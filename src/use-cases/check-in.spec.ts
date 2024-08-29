import { test, expect, describe,beforeEach } from 'vitest'
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
    })
    
    test('should be able to check in', async () => { // Unit test
        const { checkIn } = await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

})
