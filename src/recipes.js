import uuidv4 from 'uuid/v4'
import moment from 'moment'

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

// save the recipes to local storage 
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

//Expose recipes from module 
const getRecipes = () => recipes

// Create recipes
const creatRecipe = () => {
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

// Remove a recipe
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if(recipeIndex > -1){
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}
