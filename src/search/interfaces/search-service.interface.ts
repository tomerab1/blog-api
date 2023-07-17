import { SearchQuery } from 'aws-sdk/clients/kendraranking';
import SearchBody from './search-body.interface';

export default interface ISearchService<T> {
  indexEntity(entity: T);
  updateIndex(id: string, newEntity: T);
  searchDocument(query: SearchQuery);
  deleteDocument(id: string);
}
