import { Controller, Get, Query } from '@nestjs/common';
import type { SearchResults } from '@org/shared-types';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query('q') q = ''): Promise<SearchResults> {
    return this.searchService.search(q);
  }
}
