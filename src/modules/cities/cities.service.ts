import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { City } from './interfaces/city.interface';
import { CityDto } from './dto/city.dto';

@Component()
export class CitiesService {
  constructor(
    @Inject('CityModelToken') private readonly cityModel: Model<City>
  ) {}

  public async findAll(): Promise<City[]> {
    return await this.cityModel.find().exec();
  }

  public async create(cityDto: CityDto): Promise<City> {
    try {
      const createdCity = new this.cityModel(cityDto);
      return await createdCity.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(cityDto: CityDto): Promise<any> {
    try {
      return await this.cityModel.findByIdAndUpdate(
        cityDto.id,
        {
          $set: cityDto
        },
        { new: true }
      );
    } catch (err) {
      throw new Error(`The city doesn't exist`);
    }
  }

  public async delete(cityId: string): Promise<City[]> {
    try {
      return await this.cityModel.findByIdAndRemove(cityId);
    } catch (err) {
      throw new Error(`The city doesn't exist`);
    }
  }
}
