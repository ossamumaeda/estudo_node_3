import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { test, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'


let userRepo:InMemoryUsersRepository
let sut:RegisterUseCase

describe('Register Use Cases', () => {

    beforeEach(() =>{
        userRepo = new InMemoryUsersRepository()
        sut = new RegisterUseCase(userRepo);
    })

    test('should hash the password upon register', async () => { // Unit test



        const { user } = await sut.handle({
            name: 'Teste',
            email: 'Teste2@email',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )
        expect(isPasswordCorrectlyHashed).toBe(true)

    })

    test('should not be able to register with same email twice', async () => {


        const email = 'testSame@gmail.com';
        await sut.handle({
            name: 'Teste',
            email: email,
            password: '123456'
        })

        await expect(() => sut.handle({
            name: 'Teste',
            email: email,
            password: '123456'
        })
        ).rejects.toBeInstanceOf(UserAlreadyExists)


    })

})
