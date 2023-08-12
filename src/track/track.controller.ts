import { Controller, Get, Param } from '@nestjs/common';
import { Track } from './track.interface';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get('/:id')
  getTrackById(@Param('id') id: number): any {
    return this.trackService.getTrackById(id);
  }
}
