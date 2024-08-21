import { test, expect, describe,beforeEach } from 'vitest'
import {  hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'

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
        const user = await userRepo.create({
            name: 'Teste',
            email,
            password_hash: await hash(password, 6)
        })

        const { userFind } = await sut.handle({
            user.id
        })

        expect(user.id).toEqual(expect.any(String))

    })

})
