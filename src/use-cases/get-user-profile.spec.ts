import { test, expect, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFound } from './errors/resource-not-found'

let userRepo: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Cases', () => {

    beforeEach(() => {
        userRepo = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(userRepo)
    })

    test('should be able to find user by id', async () => { // Unit test
        const email = 'TestAuthenticate@email'
        const password = '123456'
        const userCreated = await userRepo.create({
            name: 'Teste',
            email,
            password_hash: await hash(password, 6)
        })

        const { user } = await sut.handle({
            userId: userCreated.id
        })

        expect(user.id).toEqual(expect.any(String))

    })

    test('should not be able to find user by id', async () => { // Unit test
        await expect(() =>   sut.handle({
                userId: 'non-ext'
            })).rejects.toBeInstanceOf(ResourceNotFound)

    })

})
