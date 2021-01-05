import { HttpResponse } from './../../presentation/protocols/http';
import errorLogger from './errorLogger';

export function ok(payload = {}): HttpResponse {
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'request successfull',
      payload,
      errors: [],
    },
  };
}

export function create(payload = {}): HttpResponse {
  return {
    statusCode: 201,
    body: {
      success: true,
      message: 'create successfull',
      payload,
      errors: [],
    },
  };
}

export function okWithHeader(payload = {}, headers: any): HttpResponse {
  return { ...ok(payload), headers };
}

export function badRequest(errors: any = []): HttpResponse {
  return {
    statusCode: 400,
    body: {
      success: false,
      message: 'invalid request params',
      payload: {},
      errors,
    },
  };
}

export function serverError(errors: any = []): HttpResponse {
  errorLogger(errors);
  return {
    statusCode: 500,
    body: {
      success: false,
      message: 'internal server error',
      payload: {},
      errors: [
        {
          message: 'Desculpe! Ocorreu um erro. Tente novamente mais tarde.',
        },
      ],
    },
  };
}

export function notFound(param: string, message: string, payload: any = {}): HttpResponse {
  return {
    statusCode: 404,
    body: {
      success: false,
      message: 'not found',
      payload,
      errors: [
        {
          message,
          param,
        },
      ],
    },
  };
}

export function unauthorized(): HttpResponse {
  return {
    statusCode: 401,
    body: {
      success: false,
      message: 'unauthorized',
      payload: {},
      errors: [
        {
          message: 'token invalid',
          param: 'token',
        },
      ],
    },
  };
}

export function conflict(param: string, message = 'already exists'): HttpResponse {
  return {
    statusCode: 409,
    body: {
      success: false,
      message: 'conflict',
      payload: {},
      errors: [
        {
          message,
          param,
        },
      ],
    },
  };
}

export function forbidden(param: string, message = 'permission denied'): HttpResponse {
  return {
    statusCode: 403,
    body: {
      success: false,
      message: 'forbidden',
      payload: {},
      errors: [
        {
          message,
          param,
        },
      ],
    },
  };
}
