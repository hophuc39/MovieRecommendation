import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { People } from './schemas/people.schema';
import { PaginationResult } from 'src/lib/interfaces/pagination-result.interface';
import { paginate } from 'src/lib/helpers/pagination.helper';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private peopleModel: Model<People>,
  ) { }

  async getAllPeople(filter: FilterQuery<People> = {}, limit?: number, offset?: number): Promise<PaginationResult<People>> {
    return paginate<People>(this.peopleModel, filter, limit, offset);
  }
}
