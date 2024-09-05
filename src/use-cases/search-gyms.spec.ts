import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'

let gymRepo: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Check-in Use Cases', () => {

    beforeEach(async () => {
        gymRepo = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymRepo)
    })

    test('should be able to search for gyms', async () => { // Unit test
        for (let i = 0; i <= 23; i++) {
            await gymRepo.create({
                title: `gym-${i}`,
                description: "Gym",
                latitude: new Decimal(0),
                longitude: new Decimal(0)
            })
        }

        const {gyms} = await sut.handle({query:'gym',page:2})

        expect(gyms).toHaveLength(4)
    })


})
