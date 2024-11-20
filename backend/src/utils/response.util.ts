import { Response } from 'express';
import { ApiResponse } from '../types';

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
  ) {
    const response: ApiResponse<T> = {
      status: 'success',
      message,
      data
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string = 'Error occurred',
    statusCode: number = 500
  ) {
    const response: ApiResponse<null> = {
      status: 'error',
      message
    };
    return res.status(statusCode).json(response);
  }
}
