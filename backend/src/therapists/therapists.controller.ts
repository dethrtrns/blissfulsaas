import { 
  Controller, 
  Get, 
  Patch, 
  Delete, 
  Param, 
  UseGuards, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { TherapistsService } from './therapists.service';

@Controller('therapists')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TherapistsController {
  constructor(private readonly therapistsService: TherapistsService) {}

  @Get('pending')
  @Roles('ADMIN')
  getPending() {
    return this.therapistsService.getPending();
  }

  @Get('verified')
  @Roles('PATIENT', 'ADMIN')
  getVerified() {
    return this.therapistsService.getAllVerified();
  }

  @Patch(':id/verify')
  @Roles('ADMIN')
  verify(@Param('id', ParseUUIDPipe) id: string) {
    return this.therapistsService.verify(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  reject(@Param('id', ParseUUIDPipe) id: string) {
    return this.therapistsService.reject(id);
  }
}
