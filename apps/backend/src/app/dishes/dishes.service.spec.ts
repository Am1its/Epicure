import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

describe('DishesService', () => {
  let service: DishesService;
  let mockStrapiClient: { get: jest.Mock; getById: jest.Mock };

  beforeEach(async () => {
    mockStrapiClient = { get: jest.fn(), getById: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [
        DishesService,
        { provide: StrapiClientService, useValue: mockStrapiClient },
      ],
    }).compile();
    service = module.get(DishesService);
  });

  describe('findAll()', () => {
    it('returns transformed dish list', async () => {
      mockStrapiClient.get.mockResolvedValue([
        { id: 1, name: 'Pad Ki Mao', price: 88, mealTime: 'Breakfast', type: 'Spicy' },
      ]);

      const result = await service.findAll();

      expect(result).toMatchObject([
        { id: 1, name: 'Pad Ki Mao', price: 88, mealTime: 'Breakfast', type: 'Spicy' },
      ]);
    });

    it('strips Strapi-internal fields', async () => {
      mockStrapiClient.get.mockResolvedValue([
        { id: 1, name: 'Pad Ki Mao', price: 88, documentId: 'xyz', publishedAt: '2024-01-01' },
      ]);

      const result = await service.findAll();

      expect(result[0]).not.toHaveProperty('documentId');
      expect(result[0]).not.toHaveProperty('publishedAt');
    });

    it('calls StrapiClientService with correct path', async () => {
      mockStrapiClient.get.mockResolvedValue([]);

      await service.findAll();

      expect(mockStrapiClient.get).toHaveBeenCalledWith('/api/dishes?populate=*');
    });
  });

  describe('findOne()', () => {
    it('returns a single transformed dish', async () => {
      mockStrapiClient.getById.mockResolvedValue({
        id: 1, name: 'Pad Ki Mao', price: 88,
      });

      const result = await service.findOne(1);

      expect(result).toMatchObject({ id: 1, name: 'Pad Ki Mao', price: 88 });
    });

    it('calls strapiClient with id filter path', async () => {
      mockStrapiClient.getById.mockResolvedValue({ id: 1, name: 'Pad Ki Mao', price: 88 });

      await service.findOne(1);

      expect(mockStrapiClient.getById).toHaveBeenCalledWith(
        '/api/dishes/1?populate=*',
      );
    });

    it('propagates NotFoundException when dish is not found', async () => {
      mockStrapiClient.getById.mockRejectedValue(new NotFoundException());

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
