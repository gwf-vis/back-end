import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import * as directoryTree from 'directory-tree';
import { readFile } from 'fs/promises';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@repository/user/user.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('tree')
  async getFileTree(@Req() request: Request) {
    const token = request.cookies['access_token'];
    const _id = this.jwtService.decode(token)?.['_id'];
    const user = (await this.userService.find({ _id }))?.[0];

    const fileTree = directoryTree('./data');
    fileTree.children = fileTree.children.filter(
      (child) => child.name === user?.username || child.name === 'public',
    );
    return fileTree;
  }

  @Get()
  async getFileContent(@Query('path') path: string) {
    return await readFile(`./data/${path}`, { encoding: 'utf-8' });
  }
}
