import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInRepository{
    findById(id:string) : Promise<CheckIn | null> 
    create(data:Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    findUserIdOnDate(userId: string, date: Date) : Promise<CheckIn | null>
    fetchManyByUserId(userId: string,page: number) : Promise<CheckIn[] | []>
    countByUserId(userId: string) : Promise<number>
    save(checkIn: CheckIn) : Promise<CheckIn>
}