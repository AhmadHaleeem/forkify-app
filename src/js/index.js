import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 **/
const state = {};

/**
 * SEARCH CONTROLLER
 **/
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    // const query = 'pizza';

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4) Search for recipes
            await state.search.getResult();
            // 5) render results on UI
            // console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result)
        } catch (e) {
            alert('Something wrong with the search...')
            clearLoader();
        }

    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
});


/**
 * RECIPE CONTROLLER
 **/
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipes data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // Calc servings and time
            state.recipe.calcServing();
            state.recipe.calcTime();

            // Render recipe
            // console.log(state.recipe)
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (e) {
            alert('Error processing recipe!')
        }
    }
};

// First way
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// Second way
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    // if I click on .btn-decrease or any child inside him
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
    }
    console.log(state.recipe)
});





