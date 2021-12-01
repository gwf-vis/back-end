import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '@repository/role/role.service';
import { UserService } from '@repository/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-in')
  async signIn(
    @Body() info: { username: string; password: string }, // TODO may use authenticationHash
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = (await this.userService.find(info))?.[0];
    if (!user) {
      throw Error('No such user.');
    } else {
      const payload = { _id: user._id.toString() };
      const token = this.jwtService.sign(payload);
      response.cookie('access_token', token, { httpOnly: true });
    }
  }

  @Post('sign-out')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = request.cookies['access_token'];
    const _id = this.jwtService.decode(token)?.['_id'];
    const user = (await this.userService.find({ _id }))?.[0];
    if (!user) {
      throw Error('No such user.');
    } else {
      response.clearCookie('access_token');
    }
  }
}
