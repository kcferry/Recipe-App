import moment from 'moment'
import { getFilters } from  './filters'
import { getRecipes, saveRecipes, sortRecipes, toggleIngredient, removeIngredient, getRecipeFromUrl } from './recipes'

const generateRecipeDom = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed recipe'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    //Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateLastEdited(recipe.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}


// Render application recipes
const renderRecipes = () => {
    const recipesEl = document.querySelector('#notes')
    const filters = getFilters()
    const recipes = sortRecipes(filters.sortBy)
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if(filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDom(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

///////////////

const generateIngredientDom = (ingredient) => {
    const ingredientEl = document.createElement('label')///
    const containerEl = document.createElement('div')///
    const checkbox = document.createElement('input')//
    const ingredientText = document.createElement('span')///
    const removeButton = document.createElement('button')///


    // Setup the checkbox
    checkbox.setAttribute('type', 'checkbox')//
    checkbox.checked = ingredient.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
             toggleIngredient(ingredient.title)
             saveRecipes()
        })

     // Setup the todo text
    ingredientText.textContent = ingredient.title
    containerEl.appendChild(ingredientText)

    // Setup container ///
    ingredientEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    ingredientEl.appendChild(containerEl)

    // Setup the remove button ///
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        debugger
        removeIngredient(ingredient.title)
    })

return ingredientEl
}

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')
    const ingredientEl = document.querySelector('#ingredients')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
    recipe.ingredients.forEach((ingredient) => {
        ingredientEl.appendChild(generateIngredientDom(ingredient))
    })
}


// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateRecipeDom, renderRecipes, generateLastEdited, initializeEditPage, generateIngredientDom }