import { Injectable } from '@nestjs/common';

@Injectable()
export default abstract class SearchBase<T> {
  // Index/databse.
  protected index: string;

  setIndex(index: string) {
    this.index = index;
  }

  abstract createIndex(entity: T);
  abstract updateIndex(id: string, entity: T);
  abstract searchDocument(text: string);
  abstract deleteDocument(id: string);
}
