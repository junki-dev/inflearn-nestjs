import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const error = exception.getResponse() as
      | string
      | { error: string; status: number; message: string | string[] };

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      error: typeof error === 'string' ? error : error.error,
    });
  }
}
