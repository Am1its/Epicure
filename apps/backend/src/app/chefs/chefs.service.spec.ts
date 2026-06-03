import { Test } from '@nestjs/testing';
import { ChefsService } from './chefs.service';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

describe('ChefsService', () => {
  let service: ChefsService;
  let mockStrapiClient: { get: jest.Mock; getById: jest.Mock };

  beforeEach(async () => {
    mockStrapiClient = { get: jest.fn(), getById: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [
        ChefsService,
        { provide: StrapiClientService, useValue: mockStrapiClient },
      ],
    }).compile();
    service = module.get(ChefsService);
  });

  describe('findAll()', () => {
    it('returns transformed chef list', async () => {
      mockStrapiClient.get.mockResolvedValue([{ id: 1, name: 'Ran Shmueli' }]);

      const result = await service.findAll();

      expect(result).toMatchObject([{ id: 1, name: 'Ran Shmueli' }]);
    });

    it('strips Strapi-internal fields', async () => {
      mockStrapiClient.get.mockResolvedValue([
        { id: 1, name: 'Ran Shmueli', documentId: 'abc', publishedAt: '2024-01-01' },
      ]);

      const result = await service.findAll();

      expect(result[0]).not.toHaveProperty('documentId');
      expect(result[0]).not.toHaveProperty('publishedAt');
    });

    it('calls StrapiClientService with correct path', async () => {
      mockStrapiClient.get.mockResolvedValue([]);

      await service.findAll();

      expect(mockStrapiClient.get).toHaveBeenCalledWith('/api/chefs?populate=*');
    });
  });

  describe('findOne()', () => {
    it('returns a single transformed chef', async () => {
      mockStrapiClient.getById.mockResolvedValue({ id: 1, name: 'Ran Shmueli' });

      const result = await service.findOne(1);

      expect(result).toMatchObject({ id: 1, name: 'Ran Shmueli' });
    });

    it('calls strapiClient with id filter path', async () => {
      mockStrapiClient.getById.mockResolvedValue({ id: 1, name: 'Ran Shmueli' });

      await service.findOne(1);

      expect(mockStrapiClient.getById).toHaveBeenCalledWith(
        '/api/chefs/1?populate=*',
      );
    });

    it('propagates NotFoundException when chef is not found', async () => {
      const { NotFoundException } = await import('@nestjs/common');
      mockStrapiClient.getById.mockRejectedValue(new NotFoundException());

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
