import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import SearchQuery from '../interfaces/search-query.interface';

@Injectable()
export default class SearchServiceBase<T> {
  // Index/databse.
  protected index: string;

  constructor(protected readonly elasticService: ElasticsearchService) {}

  setIndex(index: string) {
    this.index = index;
  }

  async indexEntity(id: string, entity: T) {
    try {
      return this.elasticService.index({
        index: this.index,
        id: id,
        refresh: true,
        body: entity,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateEntity(id: string, newEntity: T) {
    try {
      const script = Object.entries(newEntity).reduce(
        (result, [key, value]) => {
          return `${result} ctx._source.${key}='${value}';`;
        },
        '',
      );

      return await this.elasticService.updateByQuery({
        index: this.index,
        body: {
          query: {
            match: {
              id: id,
            },
          },
          script: {
            inline: script,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async searchDocument(query: SearchQuery) {
    try {
      return await this.elasticService.search({
        index: this.index,
        body: query,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(id: string) {
    try {
      return this.elasticService.delete({
        index: this.index,
        id: id,
      });
    } catch (error) {
      throw error;
    }
  }
}
