import {
  Get,
  Post,
  Delete,
  Put,
  Controller,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getTracks(@Query('artist') artist?: string): Promise<Track[]> {
    if (!artist) return this.trackService.getTracks();
    return this.trackService.getTrackByArtist(artist);
  }
  @Get(':id')
  getTrackById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<any> {
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() body): Promise<any> {
    return this.trackService.createTrack(body);
  }
  @Delete(':id')
  deleteTrackById(@Param('id') id: number) {
    return this.trackService.deleteTrackById(id);
  }
  @Put(':id')
  @HttpCode(204)
  updateTrackById(@Param('id') id: number, @Body() body): Promise<void> {
    return this.trackService.updateTrackById(id, body);
  }
}
