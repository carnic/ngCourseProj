import { Component } from '@angular/core';
import { DataStorageService } from '../shared/dataStorage.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}

  saveData(){
    this.dataStorageService.saveRecipes().subscribe(
      (response) => {
        console.log("Changes Saved!");
      },
      (error) => console.log(error)
    );
  }

  fetchData(){
    this.dataStorageService.fetchRecipes()
    .pipe(map((recipes) => {
      return recipes.map((recipe) => {
        return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}
      })
    }))
    .subscribe(
      (recipes) => {
        this.recipeService.setRecipes(recipes);
      },
      (error) => console.log(error)
    );
  }
}
