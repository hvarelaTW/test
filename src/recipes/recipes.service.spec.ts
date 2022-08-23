import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let recipesService: RecipesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [RecipesService],
    }).compile();

    recipesService = app.get<RecipesService>(RecipesService);
  });

  describe('root', () => {
    it('should return a recipe with Id 1', async () => {
      const returnedRecipe = await recipesService.findOneById('1');
      expect(returnedRecipe.id).toBe('1');
      expect(returnedRecipe.title).toBe('Recipe1');
    });
  });
});
