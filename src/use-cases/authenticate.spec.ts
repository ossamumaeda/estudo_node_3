import { test, expect, describe,beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentials } from './errors/invalid-credentials-error'

let userRepo: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register Use Cases', () => {

    beforeEach(() => {
        userRepo = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(userRepo)
    })
    
    test('should be able to authenticate', async () => { // Unit test
        const email = 'TestAuthenticate@email'
        const password = '123456'
        await userRepo.create({
            name: 'Teste',
            email,
            password_hash: await hash(password, 6)
        })

        const { user } = await sut.handle({
            email,
            password
        })

        expect(user.id).toEqual(expect.any(String))

    })

    test('should not be able to authenticate with wrong email', async () => { // Unit test
        const email = 'TestAuthenticate@email'
        const password = '123456'

        expect(() => sut.handle({
            email,
            password
        })).rejects.toBeInstanceOf(InvalidCredentials)


    })

    test('should not be able to authenticate with wrong password', async () => { // Unit test

        const email = 'TestAuthenticate@email'
        const password = '123456'

        await userRepo.create({
            name: 'Teste',
            email,
            password_hash: await hash(password, 6)
        })

        expect(() => sut.handle({
            email,
            password: '654321'
        })).rejects.toBeInstanceOf(InvalidCredentials)


    })

})
