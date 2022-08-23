import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorResponseException extends HttpException {
  constructor(msg) {
    super(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
