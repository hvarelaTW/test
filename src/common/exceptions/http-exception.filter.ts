import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-useless-constructor
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (ctx['contextType'] !== 'graphql') {
      const response = ctx.getResponse<FastifyReply>();
      const request = ctx.getRequest<FastifyRequest>();
      const status = exception.getStatus();
      const message = exception.getResponse();

      const errorExc: HttpExceptionFormat = this.formatException(
        status,
        message,
        request,
      );
      response.code(status).send(errorExc);
    }
  }

  private formatException(
    status: number,
    message: string | any,
    request: FastifyRequest,
  ): HttpExceptionFormat {
    return {
      statusCode: status,
      timestamp: new Date().toISOString(),
      code: message.statusCode,
      description: message.error,
      message: message.message,
      path: request.url,
    };
  }
}

interface HttpExceptionFormat {
  statusCode: number;
  timestamp: string;
  path?: string;
  message: string;
  code: number;
  description: string;
}
