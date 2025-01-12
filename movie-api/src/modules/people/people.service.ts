import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from './schemas/people.schema';
import { PaginationResult } from 'src/lib/interfaces/pagination-result.interface';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private peopleModel: Model<People>
  ) { }

  async getPeople(
    page: number = 1,
    limit: number = 20
  ): Promise<PaginationResult<People>> {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.peopleModel.find()
        .sort({ popularity: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.peopleModel.countDocuments()
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getPeopleDetail(id: string): Promise<any> {
    const person = await this.peopleModel.findOne({ tmdb_id: parseInt(id) })
      .lean()
      .exec();

    return person;
  }
}
