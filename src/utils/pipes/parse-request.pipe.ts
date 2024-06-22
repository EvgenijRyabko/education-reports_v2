import { Injectable, PipeTransform } from '@nestjs/common';
import { Request } from 'express';
import { parse } from 'flatted';

@Injectable()
export class RequestParsePipe implements PipeTransform {
  constructor(private readonly withFiles: boolean = false) {}

  private parseParams(params: { 0: string }): string[] {
    const matched = params[0].match(/\/?\d+\/?/g);
    return matched ? matched.map((el) => el.replaceAll('/', '')) : [];
  }

  transform(request: string) {
    const parsedRequest = parse(request);

    parsedRequest.params = this.parseParams(
      parsedRequest.params as { 0: string },
    );

    if (parsedRequest.rawHeaders.length > 0) {
      parsedRequest.headers = {};

      for (let i = 1; i < parsedRequest.rawHeaders.length; i += 2) {
        parsedRequest.headers[parsedRequest.rawHeaders[i - 1]] =
          parsedRequest.rawHeaders[i];
      }
    }

    return this.withFiles
      ? (parsedRequest as Request & {
          files: {
            fieldname: string;
            buffer: { type: string; data: string };
            mimetype: string;
            size: number;
            encoding: string;
            originalname: string;
          }[];
        })
      : (parsedRequest as Request);
  }
}
