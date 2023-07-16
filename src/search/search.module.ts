import { Logger, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import SearchServicePost from './services/search-post.service';
import SearchServiceBase from './services/search-base.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        Logger.debug('[!] Initializing Elasticsearch...');
        return {
          cloud: {
            id: configService.get('ELASTICSEARCH_CLOUD_ID'),
          },
          auth: {
            apiKey: configService.get('ELASTICSEARCH_API_KEY'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SearchServicePost, SearchServiceBase],
  exports: [ElasticsearchModule, SearchServicePost],
})
export class SearchModule {}
