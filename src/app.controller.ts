import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

//domain.com/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Felix' };
    //return this.appService.getHello();
  }
}
