import { test, expect, describe } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentials } from './errors/invalid-credentials-error'


describe('Register Use Cases', () => {

    test('should be able to authenticate', async () => { // Unit test

        const userRepo = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(userRepo);
        const email = 'TestAuthenticate@email'
        const password = '123456'
        await userRepo.create({
            name: 'Teste',
            email,
            password_hash: await hash(password,6)
        })

        const {user} = await sut.handle({
            email,
            password
        })

        expect(user.id).toEqual(expect.any(String))

    })

    test('should not be able to authenticate with wrong email', async () => { // Unit test

        const userRepo = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(userRepo);
        const email = 'TestAuthenticate@email'
        const password = '123456'

        expect(() =>sut.handle({
            email,
            password
        })).rejects.toBeInstanceOf(InvalidCredentials)


    })

    test('should not be able to authenticate with wrong password', async () => { // Unit test

        const userRepo = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(userRepo);
        const email = 'TestAuthenticate@email'
        const password = '123456'

        await userRepo.create({
            name: 'Teste',
            email,
            password_hash: await hash(password,6)
        })

        expect(() =>sut.handle({
            email,
            password:'654321'
        })).rejects.toBeInstanceOf(InvalidCredentials)


    })

})
