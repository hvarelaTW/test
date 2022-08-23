import { Test, TestingModule } from '@nestjs/testing';
import { Recipe } from './models/recipe.model';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { YapeLoggerServiceMock } from '@yaperos/lib-node-log/dist/yape-logger/yape-logger.mocks';
import { REQUEST } from '@nestjs/core';

describe('RecipesResolver', () => {
  let recipesResolver: RecipesResolver;
  let recipesService: RecipesService;

  const mockContext = { req: { id: '1' } };
  const mockRecipe: Recipe = {
    id: '1',
    title: 'Recipe1',
    creationDate: '2019-12-03T09:54:33Z',
    ingredients: ['test ingredients'],
  };
  const req = {
    id: '',
    req: {
      headers: ['x-request-id'],
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [RecipesResolver, RecipesService, YapeLoggerServiceMock],
    })
      .overrideProvider(REQUEST)
      .useValue(req)
      .compile();

    recipesResolver = app.get<RecipesResolver>(RecipesResolver);
    recipesService = app.get<RecipesService>(RecipesService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should recipe return a Recipe', async () => {
    jest
      .spyOn(recipesService, 'findOneById')
      .mockReturnValue(Promise.resolve(mockRecipe));
    const recipe = await recipesResolver.recipe('1', mockContext);
    expect(recipe).toBe(mockRecipe);
  });

  it('Should recipe return a NotFoundException if no recipe is returned from recipesService', async () => {
    expect.assertions(2);
    try {
      jest
        .spyOn(recipesService, 'findOneById')
        .mockReturnValue(Promise.resolve(undefined));
      await recipesResolver.recipe('1', mockContext);
    } catch (e) {
      expect(e.name).toBe('NotFoundException');
      expect(e.message).toBe('1');
    }
  });
});
