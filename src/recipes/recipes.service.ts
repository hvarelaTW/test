import { Injectable } from '@nestjs/common';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  private readonly items: Recipe[] = [
    {
      id: '1',
      title: 'Recipe1',
      creationDate: '2019-12-03T09:54:33Z',
      ingredients: ['test ingredients'],
    },
    {
      id: '2',
      title: 'Recipe2',
      creationDate: '2019-12-03T09:54:33Z',
      ingredients: ['test ingredients'],
    },
  ];

  async findOneById(idFromRequest: string): Promise<Recipe> {
    return this.items.find(({ id }) => id === idFromRequest);
  }
}
