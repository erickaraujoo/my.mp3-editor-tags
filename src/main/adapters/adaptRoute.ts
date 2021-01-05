import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      files: req.files as Express.Multer.File[],
      headers: req.headers,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
