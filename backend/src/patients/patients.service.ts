import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async getIntake(userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
      select: {
        intakeCompleted: true,
        reasonForSeeking: true,
        mentalHealthHistory: true,
        currentMedications: true,
        previousTherapy: true,
        therapyGoals: true,
        emergencyContactName: true,
        emergencyContactPhone: true,
        primaryConcerns: true,
      },
    });
    if (!patient) throw new NotFoundException('Patient profile not found');
    return patient;
  }

  async updateIntake(userId: string, data: {
    reasonForSeeking?: string;
    mentalHealthHistory?: string;
    currentMedications?: string;
    previousTherapy?: boolean;
    therapyGoals?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    primaryConcerns?: string[];
  }) {
    await this.prisma.patient.findUniqueOrThrow({ where: { userId } });

    return this.prisma.patient.update({
      where: { userId },
      data: {
        ...data,
        intakeCompleted: true,
      },
      select: {
        intakeCompleted: true,
        reasonForSeeking: true,
        mentalHealthHistory: true,
        currentMedications: true,
        previousTherapy: true,
        therapyGoals: true,
        emergencyContactName: true,
        emergencyContactPhone: true,
        primaryConcerns: true,
      },
    });
  }
}
