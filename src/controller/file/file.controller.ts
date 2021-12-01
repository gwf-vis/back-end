import { Controller, Get, Query } from '@nestjs/common';
import * as directoryTree from 'directory-tree';
import { readFile } from 'fs/promises';

@Controller('file')
export class FileController {
  @Get('tree')
  getFileTree() {
    return directoryTree('./data');
  }

  @Get()
  async getFileContent(@Query('path') path: string) {
    return await readFile(`./data/${path}`, { encoding: 'utf-8' });
  }
}
