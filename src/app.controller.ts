import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Cat } from './domain/schema/cat.schema';
import { CreateCatDto } from './infra/cat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/cat')
  async createCat(@Body() createCatDto: CreateCatDto) {
    try {
      console.dir(createCatDto);
      await this.appService.createCat(createCatDto);
    } catch (e) {
      console.dir(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/cat/:name')
  async getCat(@Param() params) {
    try {
      return this.appService.getCat(params.name);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/cats')
  async getCats() {
    try {
      return await this.appService.getCats();
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
