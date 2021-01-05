import { PrettyYupError } from './../../main/utils/formatters/yupErrorFormatter';
import { HttpRequest } from './http';

export interface Validation {
  validate(httpRequest: HttpRequest): void | Error;
}

export interface HttpRequestValidator {
  validate(httpRequest: HttpRequest): void | PrettyYupError | PrettyYupError[];
}
