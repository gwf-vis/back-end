import { Module } from '@nestjs/common';
import { FileController } from './file/file.controller';

@Module({
  controllers: [FileController]
})
export class ControllersModule {}
