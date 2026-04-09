import { Module } from '@nestjs/common';
import { TherapistsController } from './therapists.controller';
import { TherapistsService } from './therapists.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TherapistsController],
  providers: [TherapistsService],
})
export class TherapistsModule {}
