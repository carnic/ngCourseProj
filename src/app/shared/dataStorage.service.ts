import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    saveRecipes(){
        return this.http.put('https://ng-recipe-book-cf190.firebaseio.com/recipes.json', 
            this.recipeService.getRecipes());
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-recipe-book-cf190.firebaseio.com/recipes.json');
    }
}