import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
