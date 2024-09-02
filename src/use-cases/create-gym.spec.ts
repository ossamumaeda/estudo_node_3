import { test, expect, describe,beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepo: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Cases', () => {

    beforeEach(() => {
        gymRepo = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymRepo)
    })
    
    test('should be able to create a gym', async () => { // Unit test
        const { gym } = await sut.handle({
            title: 'Test create gym',
            description: 'Description',
            latitude: 0,
            longitude: 0,
            phone: '99999999'
        })

        expect(gym.id).toEqual(expect.any(String))

    })



})
