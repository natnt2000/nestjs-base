import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';

@Catch()
export class I18nExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = getI18nContextFromArgumentsHost(host);
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus();
    const { key, args } = <any>exception.getResponse();
    const bodyResponse = key
      ? { statusCode, message: i18n.t(key, { args }) }
      : exception.getResponse();

    return response.status(statusCode).json(bodyResponse);
  }
}
