import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Get(':id')
  async getPeopleDetail(@Param('id') id: string) {
    return this.peopleService.getPeopleDetail(id);
  }
}
