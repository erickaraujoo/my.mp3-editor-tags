import { ValidationError } from 'yup';

export interface PrettyYupError {
  message: string;
  param: string;
}

export interface formatYupError(error: ValidationError): PrettyYupError[] {
  return error.inner.map((item: any) => ({
    message: item.message,
    param: item.param,
  }));
} 