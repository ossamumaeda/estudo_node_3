import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepo: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms Use Cases', () => {

    beforeEach(async () => {
        gymRepo = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymRepo)
    })

    test('should be able to search for nearby gyms', async () => { // Unit test
        
        await gymRepo.create({
            title: `gym-nearby`,
            description: "Gym",
            latitude: new Decimal(-23.3100253),
            longitude: new Decimal(-51.3614667)
        }) 
        
        await gymRepo.create({
            title: `gym-far`,
            description: "Gym",
            latitude: new Decimal(-23.322028),
            longitude: new Decimal(-51.553756)
        })

        const {gyms} = await sut.handle({
            userLatitude:-23.311664, 
            userLongitude: -51.360595
        })

        expect(gyms).toHaveLength(1)
    })


})
