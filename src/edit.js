import { initializeEditPage, generateLastEdited, } from './views'
import { updateRecipe, removeRecipe, createIngredient } from './recipes'


const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const dateElement = document.querySelector("#last-edited")
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

// Edit Recipe title
titleElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
})

//Edit Recipe body
bodyElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
})

// Remove Recipe 
removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

//////////////////////
// New Ingredient
document.querySelector('#new-ingredient').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if(text.length > 0){
        createIngredient(text)
        initializeEditPage(recipeId)//////
        e.target.elements.text.value = ''
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(recipeId)
    }
})