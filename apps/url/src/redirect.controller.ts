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
    // TODO: add caching here with ttl
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
