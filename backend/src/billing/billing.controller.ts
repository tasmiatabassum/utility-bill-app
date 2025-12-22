import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('config')
  async getConfig() {
    return this.billingService.getConfig();
  }

  @Post('calculate')
  async calculate(@Body('units') units: number) {
    return this.billingService.calculateBill(Number(units));
  }

  @Post('admin/update')
  async updateConfig(
    @Body() body: { ratePerUnit: number; vatPercentage: number; serviceCharge: number },
    @Headers('admin-key') adminKey: string
  ) {
    // Simple Admin PIN check
    if (adminKey !== '12345') {
      throw new UnauthorizedException('Invalid Admin PIN');
    }
    return this.billingService.updateConfig(body);
  }
}