import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import SearchQuery from '../interfaces/search-query.interface';
import SearchBody from '../interfaces/search-body.interface';

@Injectable()
export default class SearchServiceBase {
  // Index/databse.
  protected index: string;

  constructor(protected readonly elasticService: ElasticsearchService) {}

  setIndex(index: string) {
    this.index = index;
  }

  async createIndex(body: SearchBody) {
    try {
      return this.elasticService.index({
        index: this.index,
        refresh: true,
        body: body.body,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateIndex(id: string, body: SearchBody) {
    try {
      return await this.elasticService.update({
        index: this.index,
        refresh: true,
        id: id,
        body: body.body,
      });
    } catch (error) {
      throw error;
    }
  }

  async searchDocument(query: SearchQuery) {
    try {
      return await this.elasticService.search({
        index: this.index,
        body: query.body,
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
