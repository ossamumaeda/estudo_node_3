import { CheckIn, Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CheckInRepository } from "../check-ins-repository";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInRepository {
    async findById(id: string) {
        const checkIn = prisma.checkIn.findUnique({
            where:{
                id
            }
        })

        return checkIn
    }
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }
    
    async findUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        
        const checkIn = prisma.checkIn.findFirst({
            where:{
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })

       return checkIn
    }

    async fetchManyByUserId(userId: string, page: number){
        const checkIns = prisma.checkIn.findMany({
            where:{
                id: userId
            },
            take: 20,
            skip: (page-1) * 20
        })

       return checkIns
    }

    async countByUserId(userId: string){
       const count = prisma.checkIn.count({
        where:{
            id: userId
        }
       })

       return count
    }

    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where:{
                id:data.id
            },
            data: data
        })

        return checkIn
    }

}