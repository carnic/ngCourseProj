
import { Injectable } from "../../../node_modules/@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/dataStorage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe[]> {
    
    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService){};
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let recipes = this.recipeService.getRecipes();
        return recipes.length==0? recipes:this.dataStorage.fetchRecipes();
    }
}