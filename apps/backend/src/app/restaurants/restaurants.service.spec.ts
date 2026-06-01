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

      expect(mockStrapiClient.get).toHaveBeenCalledWith(
        '/api/restaurants?populate[image]=*&populate[chef]=*&populate[dishes]=*',
      );
    });

    it('maps dish prices in findAll', async () => {
      mockStrapiClient.get.mockResolvedValue([
        {
          id: 1,
          name: 'Claro',
          rating: 4,
          dishes: [
            { id: 10, name: 'Pad Ki Mao', price: 88 },
            { id: 11, name: 'Red Farm', price: 98 },
          ],
        },
      ]);

      const result = await service.findAll();

      expect(result[0].dishes).toHaveLength(2);
      expect(result[0].dishes?.[0].price).toBe(88);
      expect(result[0].dishes?.[1].price).toBe(98);
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
        '/api/restaurants?filters[id][$eq]=1&populate[image]=*&populate[chef]=*&populate[dishes][populate][image]=*',
      );
    });

    it('maps dish image url from nested populate', async () => {
      mockStrapiClient.getOne.mockResolvedValue({
        id: 1,
        name: 'Claro',
        rating: 4,
        dishes: [
          {
            id: 10,
            name: 'Pad Ki Mao',
            price: 88,
            image: { url: '/uploads/pad-ki-mao.png', alternativeText: 'Pad Ki Mao' },
          },
        ],
      });

      const result = await service.findOne(1);

      expect(result.dishes?.[0].image).toEqual({
        url: '/uploads/pad-ki-mao.png',
        alternativeText: 'Pad Ki Mao',
      });
    });
  });
});
