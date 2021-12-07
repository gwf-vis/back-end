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

    const fileTree = directoryTree('./files');
    fileTree.children = fileTree.children.filter(
      (child) => child.name === user?.username || child.name === 'public',
    );
    return fileTree;
  }

  @Get()
  async getFileContent(@Query('path') path: string) {
    return await readFile(`./files/${path}`, { encoding: 'utf-8' });
  }

  // TODO remove the temp method
  @Get('data')
  async tempVisData() {
    const geoJSONPath = 'public/data/bow_river_network.json';
    const geoJSONString = await readFile(`./files/${geoJSONPath}`, {
      encoding: 'utf-8',
    });
    const geoJSONObject = JSON.parse(geoJSONString);
    return {
      baseLayers: ['Grayscale', 'Streets'],
      overlayLayers: [
        {
          name: 'River Network',
          geoJSONData: geoJSONObject,
        },
      ],
      plugins: [
        {
          name: 'Sidebar',
          tagName: 'vis-main-sidebar',
          plugins: [
            {
              name: 'BarChart',
              tagName: 'vis-main-sidebar-bar-chart',
            },
          ],
        },
      ],
    };
  }
}
