import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInRepository{
    findById(id:String) : Promise<CheckIn | null> 
    create(data:Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    findUserIdOnDate(userId: String, date: Date) : Promise<CheckIn | null>
    fetchManyByUserId(userId: String,page: number) : Promise<CheckIn[] | []>
    countByUserId(userId: String) : Promise<number>
    save(checkIn: CheckIn) : Promise<CheckIn>
}