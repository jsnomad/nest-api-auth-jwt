import { Document } from 'mongoose';

export interface City extends Document {
  readonly name: string;
  readonly totalPopulation: number;
  readonly country: string;
  readonly zipCode: number;
}
