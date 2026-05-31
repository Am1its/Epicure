import { Test } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

const mockStrapiClient = { get: jest.fn(), getOne: jest.fn() };

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        { provide: StrapiClientService, useValue: mockStrapiClient },
      ],
    }).compile();
    service = module.get(RestaurantsService);
  });

  afterEach(() => jest.resetAllMocks());

  describe('findAll()', () => {
    it('returns transformed restaurant list', async () => {
      mockStrapiClient.get.mockResolvedValue([
        { id: 1, name: 'Claro', rating: 4, chef: { id: 1, name: 'Ran Shmueli' } },
      ]);

      const result = await service.findAll();

      expect(result).toMatchObject([{ id: 1, name: 'Claro', rating: 4 }]);
      expect(result[0].chef).toMatchObject({ id: 1, name: 'Ran Shmueli' });
    });

    it('strips Strapi-internal fields', async () => {
      mockStrapiClient.get.mockResolvedValue([
        { id: 1, name: 'Claro', rating: 4, documentId: 'abc', publishedAt: '2024-01-01' },
      ]);

      const result = await service.findAll();

      expect(result[0]).not.toHaveProperty('documentId');
      expect(result[0]).not.toHaveProperty('publishedAt');
    });

    it('calls StrapiClientService with correct path', async () => {
      mockStrapiClient.get.mockResolvedValue([]);

      await service.findAll();

      expect(mockStrapiClient.get).toHaveBeenCalledWith('/api/restaurants?populate=*');
    });
  });

  describe('findOne()', () => {
    it('returns a single transformed restaurant', async () => {
      mockStrapiClient.getOne.mockResolvedValue({ id: 1, name: 'Claro', rating: 4 });

      const result = await service.findOne(1);

      expect(result).toMatchObject({ id: 1, name: 'Claro', rating: 4 });
    });

    it('calls strapiClient with id filter path', async () => {
      mockStrapiClient.getOne.mockResolvedValue({ id: 1, name: 'Claro', rating: 4 });

      await service.findOne(1);

      expect(mockStrapiClient.getOne).toHaveBeenCalledWith(
        '/api/restaurants?filters[id][$eq]=1&populate=*',
      );
    });
  });
});
