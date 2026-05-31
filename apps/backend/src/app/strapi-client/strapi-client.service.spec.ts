import { Test } from '@nestjs/testing';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { StrapiClientService } from './strapi-client.service';

describe('StrapiClientService', () => {
  let service: StrapiClientService;
  let fetchSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [StrapiClientService],
    }).compile();
    service = module.get(StrapiClientService);
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => fetchSpy.mockRestore());

  describe('get()', () => {
    it('returns unwrapped data array', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ id: 1, name: 'Claro' }] }),
      } as any);

      const result = await service.get('/api/restaurants?populate=*');

      expect(result).toEqual([{ id: 1, name: 'Claro' }]);
    });

    it('calls Strapi with the correct full URL', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: async () => ({ data: [] }),
      } as any);

      await service.get('/api/restaurants?populate=*');

      expect(fetchSpy).toHaveBeenCalledWith(
        'http://localhost:1337/api/restaurants?populate=*',
      );
    });

    it('throws ServiceUnavailableException when Strapi is unreachable', async () => {
      fetchSpy.mockRejectedValue(new Error('ECONNREFUSED'));

      await expect(service.get('/api/restaurants')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });

    it('throws ServiceUnavailableException on non-2xx response', async () => {
      fetchSpy.mockResolvedValue({ ok: false, status: 500 } as any);

      await expect(service.get('/api/restaurants')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });

    it('throws ServiceUnavailableException when response is not valid JSON', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: async () => { throw new SyntaxError('Unexpected token'); },
      } as any);

      await expect(service.get('/api/restaurants')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('getOne()', () => {
    it('returns first item from data array', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ id: 1, name: 'Claro' }] }),
      } as any);

      const result = await service.getOne('/api/restaurants?filters[id][$eq]=1');

      expect(result).toEqual({ id: 1, name: 'Claro' });
    });

    it('throws NotFoundException when data array is empty', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: async () => ({ data: [] }),
      } as any);

      await expect(
        service.getOne('/api/restaurants?filters[id][$eq]=999'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
