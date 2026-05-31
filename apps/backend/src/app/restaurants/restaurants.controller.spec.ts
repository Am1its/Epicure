import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

const mockService = { findAll: jest.fn(), findOne: jest.fn() };

describe('RestaurantsController', () => {
  let controller: RestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [{ provide: RestaurantsService, useValue: mockService }],
    }).compile();
    controller = module.get(RestaurantsController);
  });

  afterEach(() => jest.resetAllMocks());

  it('findAll() delegates to service and returns result', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1, name: 'Claro', rating: 4 }]);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Claro');
  });

  it('findOne() passes id param to service', async () => {
    mockService.findOne.mockResolvedValue({ id: 1, name: 'Claro', rating: 4 });

    const result = await controller.findOne(1);

    expect(mockService.findOne).toHaveBeenCalledWith(1);
    expect(result.name).toBe('Claro');
  });
});
