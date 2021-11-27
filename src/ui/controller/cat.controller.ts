import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CatService } from '../../service/cat.service';
import { CreateCatDto } from '../../service/cat.dto';

@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post('/cat')
  async createCat(@Body() createCatDto: CreateCatDto) {
    try {
      console.dir(createCatDto);
      await this.catService.createCat(createCatDto);
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
      return this.catService.getCat(params.name);
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
      return await this.catService.getCats();
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
