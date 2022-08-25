import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PersonService } from './person.service';
import {
  CreateEmailDto,
  CreatePersonDto,
  CreatePhoneNumberDto,
  ReturnEmailDto,
  ReturnPersonDto,
  UpdatePersonDto,
} from './dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return plainToClass(
      ReturnPersonDto,
      this.personService.create(createPersonDto),
    );
  }

  @Get()
  async findAll() {
    const data = await this.personService.findAll();
    return data.map((d) => plainToClass(ReturnPersonDto, d));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return plainToClass(ReturnPersonDto, this.personService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return plainToClass(
      ReturnPersonDto,
      this.personService.update(id, updatePersonDto),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }

  @Post(':id/emails')
  createEmail(@Param('id') id: string, @Body() createEmailDto: CreateEmailDto) {
    return plainToClass(
      ReturnEmailDto,
      this.personService.addEmail(id, createEmailDto),
    );
  }

  @Get(':id/emails')
  getEmails(@Param('id') id: string) {
    return plainToClass(ReturnEmailDto, this.personService.getEmails(id));
  }

  @Get(':id/emails/:emailId')
  getEmail(@Param('id') id: string, @Param('emailId') emailId: string) {
    return plainToClass(
      ReturnEmailDto,
      this.personService.getEmail(id, emailId),
    );
  }

  @Post(':id/phone-numbers')
  createPhoneNumber(
    @Param('id') id: string,
    @Body() createPhoneNumberDto: CreatePhoneNumberDto,
  ) {
    return plainToClass(
      CreatePhoneNumberDto,
      this.personService.addPhoneNumber(id, createPhoneNumberDto),
    );
  }

  @Get(':id/phone-numbers')
  getPhoneNumbers(@Param('id') id: string) {
    return plainToClass(ReturnEmailDto, this.personService.getPhoneNumbers(id));
  }

  @Get(':id/phone-numbers/:phoneNumberId')
  getPhoneNumber(
    @Param('id') id: string,
    @Param('phoneNumberId') phoneNumberId: string,
  ) {
    return plainToClass(
      ReturnEmailDto,
      this.personService.getPhoneNumber(id, phoneNumberId),
    );
  }
}
