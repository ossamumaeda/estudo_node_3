import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInRepository{
    create(data:Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    findUserIdOnDate(userId: String, date: Date) : Promise<CheckIn | null>
    fetchManyByUserId(userId: String,page: number) : Promise<CheckIn[] | []>
}