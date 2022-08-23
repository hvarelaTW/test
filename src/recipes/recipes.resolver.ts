import { Inject, NotFoundException } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { REQUEST } from '@nestjs/core';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';
import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';
import { validateHeadersGraphql } from '../common/utils/validate-headers';

@Resolver(() => Recipe)
export class RecipesResolver {
  private readonly requestLogInfo: RequestLogInfo;

  constructor(
    @Inject(REQUEST) private request,
    private logger: YapeLoggerService,
    private readonly recipesService: RecipesService,
  ) {
    this.requestLogInfo = validateHeadersGraphql(
      request,
      RecipesResolver.name,
      this.recipe.name,
      'MS-NEST-TEMPLATE',
      'RECIPES-RESOLVER',
    );
  }

  @Query(() => Recipe)
  async recipe(
    @Args('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Context() context: any,
  ): Promise<Recipe> {
    this.logger.log('Recipe find by id', this.requestLogInfo);
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }
}
