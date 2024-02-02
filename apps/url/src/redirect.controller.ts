import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { PrismaService } from './prisma.service';

@Controller()
export class RedirectController {
  constructor(private prisma: PrismaService) {}

  @Get(':shortUrlCode')
  async redirect(
    @Res() res: Response,
    @Param('shortUrlCode') shortUrlCode: string,
  ): Promise<void> {
    // TODO: call url service to get the long url, the url service should first check in cache, if it exists then return
    // else get from db and put it in cache. if doesn't exist in db as well then throw relevant error from here

    const link = await this.prisma.link.findFirst({
      where: { shortUrlCode },
      select: { originalUrl: true },
    });

    if (link) {
      return res.redirect(HttpStatus.TEMPORARY_REDIRECT, link.originalUrl);
    }

    res.sendStatus(HttpStatus.NOT_FOUND);
  }
}
