import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  // Get the current configuration
  async getConfig() {
    return this.prisma.systemConfig.findFirst({ orderBy: { id: 'desc' } });
  }

  // Admin: Update the configuration
  async updateConfig(dto: { ratePerUnit: number; vatPercentage: number; serviceCharge: number }) {
    // Basic validation
    if (dto.vatPercentage < 0 || dto.vatPercentage > 100) {
       throw new BadRequestException("VAT must be between 0 and 100");
    }
    
    return this.prisma.systemConfig.create({
      data: {
        ratePerUnit: Number(dto.ratePerUnit),
        vatPercentage: Number(dto.vatPercentage),
        serviceCharge: Number(dto.serviceCharge),
      },
    });
  }

  // User: Calculate the bill
  async calculateBill(units: number) {
    if (units < 0) throw new BadRequestException("Units must be positive");

    const config = await this.getConfig();
    if (!config) throw new BadRequestException("System configuration missing");

    const subTotal = units * config.ratePerUnit;
    const vatAmount = (subTotal * config.vatPercentage) / 100;
    const totalAmount = subTotal + vatAmount + config.serviceCharge;

    return {
      units,
      ratePerUnit: config.ratePerUnit,
      subTotal: Number(subTotal.toFixed(2)),
      vatPercentage: config.vatPercentage,
      vatAmount: Number(vatAmount.toFixed(2)),
      serviceCharge: config.serviceCharge,
      totalAmount: Number(totalAmount.toFixed(2)),
    };
  }
}