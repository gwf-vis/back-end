import { Controller, Get } from '@nestjs/common';
import * as directoryTree from 'directory-tree';

@Controller('file')
export class FileController {
  @Get('tree')
  getFileTree() {
    return directoryTree('./data');
  }
}
