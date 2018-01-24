import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Component()
export class AuthService {
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<User>
  ) {}

  public async createToken(userDto: UserDto) {
    const expiresIn = 60 * 60,
      secretOrKey = 'secret';
    const user = { email: userDto.email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token
    };
  }

  public async checkUser(userDto: UserDto) {
    const user: UserDto = await this.userModel.findOne({
      email: userDto.email
    });
    if (user) {
      const compare = await bcrypt.compare(userDto.password, user.password);
      if (!compare) {
        throw new Error('Invalid credential');
      }
    } else {
      throw new Error('Invalid credential');
    }
  }

  public async createAccount(userDto: UserDto): Promise<any> {
    try {
      const createdUser = new this.userModel(userDto);
      await createdUser.save();
    } catch (err) {
      const customError =
        err.code == '11000' ? 'User already exist' : 'Something went wrong ..';
      throw new Error(customError);
    }
  }

  public async validateUser(signedUser): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ email: signedUser.email });
      return user ? true : false;
    } catch (err) {
      return false;
    }
  }
}
