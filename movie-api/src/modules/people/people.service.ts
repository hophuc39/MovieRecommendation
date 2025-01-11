import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from './schemas/people.schema';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private peopleModel: Model<People>
  ) { }

  async getPeopleDetail(id: string): Promise<any> {
    const person = await this.peopleModel.findOne({ tmdb_id: parseInt(id) })
      .lean()
      .exec();

    return person;
  }
}
