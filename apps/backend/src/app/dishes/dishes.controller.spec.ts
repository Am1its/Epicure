import { Test, TestingModule } from '@nestjs/testing';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

describe('DishesController', () => {
  let controller: DishesController;
  let mockService: { findAll: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    mockService = { findAll: jest.fn(), findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishesController],
      providers: [{ provide: DishesService, useValue: mockService }],
    }).compile();
    controller = module.get(DishesController);
  });

  it('findAll() delegates to service and returns result', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1, name: 'Pad Ki Mao', price: 88 }]);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result[0].name).toBe('Pad Ki Mao');
  });

  it('findOne() passes id param to service and returns result', async () => {
    mockService.findOne.mockResolvedValue({ id: 1, name: 'Pad Ki Mao', price: 88 });

    const result = await controller.findOne(1);

    expect(mockService.findOne).toHaveBeenCalledWith(1);
    expect(result).toMatchObject({ id: 1, name: 'Pad Ki Mao', price: 88 });
  });
});
