import { Controller, Get, UseGuards } from '@nestjs/common';

import { PeopleService } from './people.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) { }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async getAllPeople() {
    return await this.peopleService.getAllPeople();
  }
}
