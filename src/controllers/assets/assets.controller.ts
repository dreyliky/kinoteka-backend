import { Controller, Get, Request, Res } from '@nestjs/common';
import * as fs from 'fs';

@Controller('assets')
export class AssetsController {
    @Get('*')
    public get(
        @Request() request: Request,
        @Res() response: any
    ): void {
        const file = fs.createReadStream(`${global.__basedir}${request.url}`);
    
        file.pipe(response);
    }
}
 