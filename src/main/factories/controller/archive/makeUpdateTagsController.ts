import { UpdateTagsArchiveController } from './../../../../presentation/controller/archive/updateTagsController';
import { Controller } from './../../../../presentation/protocols/controller';

export function makeUpdateTagsController(): Controller {
  return new UpdateTagsArchiveController();
}