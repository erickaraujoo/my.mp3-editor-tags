export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  file?: Express.Multer.File;
  files?: any;
  headers?: any;
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
  headers?: any;
}