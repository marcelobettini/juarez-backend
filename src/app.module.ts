import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { Module } from '@nestjs/common';

import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
  ],
  controllers: [TrackController],
  providers: [TrackService],
})
export class AppModule {}
