import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ServeStaticModule } from '@nestjs/serve-static';

export const STATIC_PATH = 'F:\\go-pro';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: STATIC_PATH,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
