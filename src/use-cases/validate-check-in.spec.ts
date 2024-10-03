import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckinUseCase } from './validate-check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckinUseCase } from './checkin'
import { M } from 'vitest/dist/chunks/reporters.C_zwCd4j'
import { rejects } from 'assert'
import { ResourceNotFound } from './errors/resource-not-found'

let checkInRepo: InMemoryCheckInsRepository
let sut: ValidateCheckinUseCase
let gymsRepository: InMemoryGymsRepository

describe('Validate Check-in Use Cases', () => {

    beforeEach(async () => {
        checkInRepo = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new ValidateCheckinUseCase(checkInRepo)

        vi.useFakeTimers()

        await gymsRepository.create({
            description: "Academia Teste",
            id: 'gym-id',
            latitude: 0,
            longitude: 0,
            phone: "9999999999",
            title: "Teste Gym" 
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('should be able to validate check in', async () => { // Unit test

        const createdCheckIn = await checkInRepo.create({
            gym_id: 'id-1',
            user_id: '1'
        })

        const {checkIn} = await sut.handle({
            checkInId: createdCheckIn.id
        })

        expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepo.items[0].validated_at).toEqual(expect.any(Date))

    })

    test('should not be able to validate check in', async () => { // Unit test

        await expect(() =>
            sut.handle({
                checkInId: 'not-found'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })

})
