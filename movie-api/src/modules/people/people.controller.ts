import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Get()
  async getPeople(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20'
  ) {
    return this.peopleService.getPeople(
      parseInt(page),
      parseInt(limit)
    );
  }

  @Get(':id')
  async getPeopleDetail(@Param('id') id: string) {
    return this.peopleService.getPeopleDetail(id);
  }
}
