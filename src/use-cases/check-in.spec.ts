import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepo: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-in Use Cases', () => {

    beforeEach(async () => {
        checkInRepo = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckinUseCase(checkInRepo, gymsRepository)

        vi.useFakeTimers()
        gymsRepository.items.push({
            description: "Academia Teste",
            id: 'gym-id',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            phone: "9999999999",
            title: "Teste Gym"
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('should be able to check in', async () => { // Unit test
        const { checkIn } = await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    // red -> green -> refactor
    test('should not be able to check in twice in the same day', async () => { // Unit test
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() => sut.handle({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(Error)

    })

    test('should be able to check in twice but in different days', async () => { // Unit test
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.handle({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0
        })
        expect(checkIn.id).toEqual(expect.any(String))

    })

    test('should not be able to check in a far away gym', async () => { // Unit test
        gymsRepository.items.push({
            description: "Academia mais de 100 metros",
            id: 'gym-id-2',
            latitude: new Decimal(-23.3166783),
            longitude: new Decimal(-51.4100528),
            phone: "9999999999",
            title: "Far Far away gym"
        })

        await expect(() => sut.handle({
            gymId: 'gym-id-2',
            userId: 'user-id',
            userLatitude: -23.4188852,
            userLongitude: -51.938808
        })).rejects.toBeInstanceOf(Error)

    })

    test('should be able to check in a close gym', async () => { // Unit test
        gymsRepository.items.push({
            description: "Academia mais de 100 metros",
            id: 'gym-id-2',
            latitude: new Decimal(-23.418114),
            longitude: new Decimal( -51.939635),
            phone: "9999999999",
            title: "Far Far away gym"
        })

        const {checkIn} = await sut.handle({
            gymId: 'gym-id-2',
            userId: 'user-id',
            userLatitude: -23.418183,
            userLongitude: -51.939832
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

})
