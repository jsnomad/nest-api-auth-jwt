import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly password: string;
  readonly role: string;
}
