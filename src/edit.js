import { initializeEditPage, generateLastEdited, renderRecipes } from './views'
import { updateRecipe, removeRecipe, loadRecipes, createIngredient, } from './recipes'


const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector("#last-edited")
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)


titleElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
    

    if(text.length > 0){
        createIngredient(text)
        initializeEditPage(recipeId)
        e.target.elements.text.value = ''
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(recipeId)
    }
})