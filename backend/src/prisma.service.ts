import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // Seed default config if none exists
    const count = await this.systemConfig.count();
    if (count === 0) {
      await this.systemConfig.create({
        data: { ratePerUnit: 5.0, vatPercentage: 5.0, serviceCharge: 10.0 },
      });
    }
  }
}