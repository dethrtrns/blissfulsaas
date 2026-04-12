import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(senderUserId: string, appointmentId: string, content: string) {
    // 1. Verify the appointment exists
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true, therapist: true },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

    // 2. Security: only participants can send messages
    const isPatient = appointment.patient.userId === senderUserId;
    const isTherapist = appointment.therapist.userId === senderUserId;
    if (!isPatient && !isTherapist) {
      throw new ForbiddenException('Not a participant of this appointment');
    }

    // 3. Insert the message
    return this.prisma.message.create({
      data: {
        appointmentId,
        senderId: senderUserId,
        content,
      },
      include: {
        sender: { select: { id: true, email: true, role: true } },
      },
    });
  }

  async getMessages(requesterUserId: string, appointmentId: string) {
    // Verify participation first
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true, therapist: true },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

    const isParticipant =
      appointment.patient.userId === requesterUserId ||
      appointment.therapist.userId === requesterUserId;

    if (!isParticipant) throw new ForbiddenException('Not a participant');

    return this.prisma.message.findMany({
      where: { appointmentId },
      include: {
        sender: { select: { id: true, email: true, role: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
