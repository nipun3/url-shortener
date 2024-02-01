import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';

@Controller()
export class RedirectController {
  @Get(':code')
  async redirect(@Res() res, @Param('code') code: string): Promise<void> {
      // TODO: call url service to get the long url, the url service should first check in cache, if it exists then return
      // else get from db and put it in cache. if doesn't exist in db as well then throw relevant error from here
    if (code === 'Ovy8Sil0') return res.redirect('https://www.google.com');
  }
}
