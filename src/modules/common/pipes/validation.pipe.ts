import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
  Pipe
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    const errorsDescription = errors.map((error: any) => {
      return error.constraints[Object.keys(error.constraints)[0]];
    });

    if (errors.length > 0) {
      throw new HttpException(errorsDescription, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
