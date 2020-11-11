import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { initializeEditPage, generateIngredientDom } from './views'

let recipes = []


// Read excisting recipes from local storage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

recipes = loadRecipes()

// save the recipes to local storage 
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

//Expose recipes from module 
const getRecipes = () => recipes


// Create recipes
const createRecipe = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    recipes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp,
        ingredients: []
    })
    saveRecipes()
    return id
}

const getRecipeFromUrl = () => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find((r) => r.id == recipeId)

    return recipe
}


console.log(getRecipeFromUrl()) /////////////


// Create Ingredient
const createIngredient = (item) => {
    const recipe = getRecipeFromUrl()
    recipe.ingredients.push({
        title: item,
        completed: false
    })
    saveRecipes()
} 

//createIngredient('Oven')


// Remove Ingredients
const removeIngredient = (title) => {
    const recipe = getRecipeFromUrl()
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.title === title)

    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
    }
    saveRecipes()
}

// Toggle Ingredients
const toggleIngredient = (title) => {
    console.log(title)
    const recipe = getRecipeFromUrl()
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.title === title)

    if (ingredient) {
        ingredient.completed = !ingredient.completed
        saveRecipes()
    }
}

loadRecipes()

// Remove a recipe
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if(recipeIndex > -1){
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

// Sort recipes 1 of 3 ways
const sortRecipes = (sortBy) => {
    if(sortBy === 'byEdited') {
        return recipes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated')  {
        return recipes.sort((a,b) => {
            if(a.createdAt > b.createdAt){
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return recipes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return recipes
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)
    
    if(!recipe){
        return
    }

    if(typeof updates.title === 'string'){
        recipe.title = updates.title
        recipe.updatedAt = moment().valueOf()
    }

    if(typeof updates.body === 'string'){
        recipe.body = updates.body
        recipe.updatedAt = moment().valueOf()
    }

    saveRecipes()
    return recipe
} 


recipes = loadRecipes()





export { createIngredient, loadRecipes, getRecipes, saveRecipes, createRecipe, removeRecipe, sortRecipes, updateRecipe, toggleIngredient, removeIngredient, getRecipeFromUrl }
