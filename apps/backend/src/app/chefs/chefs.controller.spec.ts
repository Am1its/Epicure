import { Test, TestingModule } from '@nestjs/testing';
import { ChefsController } from './chefs.controller';
import { ChefsService } from './chefs.service';

const mockService = { findAll: jest.fn(), findOne: jest.fn() };

describe('ChefsController', () => {
  let controller: ChefsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChefsController],
      providers: [{ provide: ChefsService, useValue: mockService }],
    }).compile();
    controller = module.get(ChefsController);
  });

  afterEach(() => jest.resetAllMocks());

  it('findAll() delegates to service and returns result', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1, name: 'Ran Shmueli' }]);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result[0].name).toBe('Ran Shmueli');
  });

  it('findOne() passes id param to service and returns result', async () => {
    mockService.findOne.mockResolvedValue({ id: 1, name: 'Ran Shmueli' });

    const result = await controller.findOne(1);

    expect(mockService.findOne).toHaveBeenCalledWith(1);
    expect(result).toMatchObject({ id: 1, name: 'Ran Shmueli' });
  });
});
