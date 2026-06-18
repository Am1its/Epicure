import { Test } from '@nestjs/testing';
import { SearchService } from './search.service';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

const mockStrapiClient = {
  get: jest.fn(),
};

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: StrapiClientService, useValue: mockStrapiClient },
      ],
    }).compile();
    service = module.get(SearchService);
    mockStrapiClient.get.mockResolvedValue([]);
  });

  afterEach(() => jest.clearAllMocks());

  it('returns cuisines matching the query (case-insensitive)', async () => {
    const result = await service.search('ital');
    expect(result.cuisines).toEqual([{ label: 'Italian' }]);
  });

  it('returns empty cuisines when no match', async () => {
    const result = await service.search('xyz');
    expect(result.cuisines).toEqual([]);
  });

  it('returns multiple cuisines when query matches several', async () => {
    const result = await service.search('an');
    expect(result.cuisines.length).toBeGreaterThan(1);
    expect(result.cuisines.every(c => c.label.toLowerCase().includes('an'))).toBe(true);
  });

  it('returns empty result for blank query', async () => {
    const result = await service.search('');
    expect(result).toEqual({ restaurants: [], chefs: [], cuisines: [] });
    expect(mockStrapiClient.get).not.toHaveBeenCalled();
  });
});
