import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { test, expect, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'


describe('Register Use Cases', () => {

    test('should hash the password upon register', async () => { // Unit test

        const userRepo = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(userRepo);

        const { user } = await registerUseCase.handle({
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
        const userRepo = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(userRepo);

        const email = 'testSame@gmail.com';
        await registerUseCase.handle({
            name: 'Teste',
            email: email,
            password: '123456'
        })

        await expect(() => registerUseCase.handle({
            name: 'Teste',
            email: email,
            password: '123456'
        })
        ).rejects.toBeInstanceOf(UserAlreadyExists)


    })

})
