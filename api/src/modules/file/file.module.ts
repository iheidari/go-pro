import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'C:\\Users\\Home\\Projects\\go-pro\\_api\\files',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
