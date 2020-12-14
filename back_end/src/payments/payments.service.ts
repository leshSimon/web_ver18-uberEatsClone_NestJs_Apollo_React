import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "src/globalLib/prisma.service";
import { user } from "src/users/entities/user.entity";
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from "./dtos/create-payment.dto";
import { GetPaymentOutput } from "./dtos/get-payments.dto";

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(
    owner: user,
    { transactionId, restaurantId }: CreatePaymentInput
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.prisma.restaurant.findOne({
        where: { id: restaurantId },
        select: { owner: true },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: "Restaurant not found.",
        };
      }
      if (restaurant.owner !== owner.id) {
        return {
          ok: false,
          error: "You are not allowed to do this.",
        };
      }
      await this.prisma.payment.create({
        data: {
          transactionId,
          user: { connect: { id: owner.id } },
          restaurant: { connect: { id: restaurantId } },
        },
      });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error:
          "error catched at 'createPayment' function in 'payments.service.ts'",
      };
    }
  }

  async getPayments(user: user): Promise<GetPaymentOutput> {
    try {
      const payments = await this.prisma.payment.findMany({
        where: { userId: user.id },
      });
      return {
        ok: true,
        payments,
      };
    } catch (e) {
      return {
        ok: false,
        error:
          "error catched at 'getPayments' function in 'payments.service.ts'",
      };
    }
  }
}
