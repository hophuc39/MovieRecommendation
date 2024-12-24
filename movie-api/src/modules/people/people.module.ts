import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleSchema } from './schemas/people.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'People', schema: PeopleSchema }
  ])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule { }
