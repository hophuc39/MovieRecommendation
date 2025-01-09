import { Controller, Get, UseGuards } from '@nestjs/common';

import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) { }

  @Get()
  async getAllPeople() {
    return await this.peopleService.getAllPeople();
  }
}
