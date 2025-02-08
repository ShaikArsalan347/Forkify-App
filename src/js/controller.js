import "core-js/stable";
import "regenerator-runtime/runtime";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import * as model from "./model.js";
///////////////////////////////////////\
// if (module.hot) {
//   module.hot.accept();
// }
if (module.hot) {
  console.log("✅ HMR is enabled!");
  module.hot.accept();
} else {
  console.log("❌ HMR is NOT working!");
}

console.log(model.state);
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // load recipe
    await model.loadRecipe(id);
    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  // Default to page 1
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search result
    await model.loadSearchResult(query);

    // Render result
    resultsView.render(model.getSearchResultsPage());
    // resultView.render(resultsPage);

    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResult();
const controlpagination = function (goToPage) {
  // Render new result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);
  // update the serving view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // Update the recipeview
  recipeView.update(model.state.recipe);
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show spinner
    addRecipeView.renderSpinner();

    // Upload Recipe
    await model.uploadRecipe(newRecipe);
    console.log(newRecipe);
    // Render Recipe
    recipeView.render(model.state.recipe);

    // // Show success message
    addRecipeView.renderMessage();

    // // Update bookmarks
    bookmarksView.render(model.state.bookmarks);

    // // Change URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close modal after a delay
    setTimeout(function () {
      addRecipeView._parentElement.reset();
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💩", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandelerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlpagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
