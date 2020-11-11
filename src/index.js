import { setFilters } from './filters'
import { createRecipe, getRecipes, loadRecipes, removeRecipe, createIngredient } from './recipes.js'
import { renderRecipes } from './views.js'

console.log(getRecipes())
renderRecipes()



document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})





 






