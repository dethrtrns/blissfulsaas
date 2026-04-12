import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async createSlot(therapistId: string, data: { dayOfWeek: number; startTime: string; endTime: string }) {
    // Check for duplicates
    const existing = await this.prisma.availabilitySlot.findUnique({
      where: {
        therapistId_dayOfWeek_startTime: {
          therapistId,
          dayOfWeek: data.dayOfWeek,
          startTime: data.startTime,
        },
      },
    });

    if (existing) {
      if (existing.isActive) {
        throw new ConflictException('A slot already exists for this time');
      } else {
        // Reactivate inactive slot
        return this.prisma.availabilitySlot.update({
          where: { id: existing.id },
          data: { isActive: true, endTime: data.endTime },
        });
      }
    }

    return this.prisma.availabilitySlot.create({
      data: {
        ...data,
        therapistId,
      },
    });
  }

  async getMySlots(therapistId: string) {
    return this.prisma.availabilitySlot.findMany({
      where: { therapistId, isActive: true },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' },
      ],
    });
  }

  async deactivateSlot(therapistId: string, id: string) {
    const slot = await this.prisma.availabilitySlot.findUnique({
      where: { id },
    });

    if (!slot) throw new NotFoundException('Slot not found');
    if (slot.therapistId !== therapistId) throw new ForbiddenException('Not your slot');

    return this.prisma.availabilitySlot.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getTherapistSlots(therapistId: string) {
    return this.prisma.availabilitySlot.findMany({
      where: { therapistId, isActive: true },
      include: {
        appointments: {
          where: {
            status: { not: 'CANCELLED' },
            scheduledAt: { gte: new Date() }
          }
        }
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' },
      ],
    });
  }
}
