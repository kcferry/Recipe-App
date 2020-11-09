import moment from 'moment'
import getFilters from  './filters'
import getRecipes from './recipes'

const generateRecipeDom = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (recipe.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed recipe'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    

    //Setup the link 
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateLastEdited(recipe.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}

// Render application notes
const renderRecipes = () => {
    const recipeEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortRecipes(filters.sortBy)
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipeEl.innerHTML = ''

    if(filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            notesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipeEl.appendChild(emptyMessage)
    }
}


const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')
    const recipes = getRecipes()
    const recipe = notes.find((note) => note.id === noteId)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateRecipeDom, renderRecipes, generateLastEdited, initializeEditPage }