import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) { }

    async createOne(newUser) {
        return await this.prismaService.user.create({
            data: newUser,
        });
    }

    async findOne(email?: string, id?: string) {
        return await this.prismaService.user.findUnique({
            where: {
                ...(email ? { email } : { id }),
            }
        });
    }
}
