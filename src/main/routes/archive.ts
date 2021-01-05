import { Router } from 'express';
import { adaptRoute } from '../adapters/adaptRoute';
import { makeUpdateTagsController } from '../factories/controller/archive';

export default (routes: Router) => {
  routes.put('/archive/tags', adaptRoute(makeUpdateTagsController()));
}