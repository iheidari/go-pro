import { Module } from '@nestjs/common';
import { FileController } from './modules/file/file.controller';
import { FileService } from './modules/file/file.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { VideoController } from './modules/video/video.controller';
import { VideoService } from './modules/video/video.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: process.env.STATIC_PATH,
    }),
  ],
  controllers: [FileController, VideoController],
  providers: [FileService, VideoService],
})
export class AppModule {}
