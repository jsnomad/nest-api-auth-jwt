import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  HttpCode,
  Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiUseTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Login successful.'
  })
  public async login(@Body() userDto: UserDto) {
    try {
      await this.authService.checkUser(userDto);
      return await this.authService.createToken(userDto);
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'The account has been successfully created.'
  })
  async create(@Body() userDto: UserDto) {
    try {
      await this.authService.createAccount(userDto);
      return await this.authService.createToken(userDto);
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
