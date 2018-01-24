import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { CityDto } from './dto/city.dto';
import { CitiesService } from './cities.service';
import { City } from './interfaces/city.interface';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('cities')
@ApiBearerAuth()
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiResponse({ status: 401, description: 'Forbidden' })
  async findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The city has been successfully created.'
  })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  async create(@Body() citiesDto: CityDto) {
    return await this.citiesService.create(citiesDto);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'The city has been successfully updated.'
  })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  async update(@Body() citiesDto: CityDto): Promise<City[]> {
    try {
      return await this.citiesService.update(citiesDto);
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'The city has been successfully deleted.'
  })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  async delete(@Body() citiesDto: CityDto): Promise<City[]> {
    try {
      return await this.citiesService.delete(citiesDto.id);
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
