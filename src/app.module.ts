import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { Module } from '@nestjs/common';

import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
    TrackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
