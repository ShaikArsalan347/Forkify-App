import "core-js/stable";
import "regenerator-runtime/runtime";
//
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
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
    resultView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search result
    await model.loadSearchResult(query);

    // Render result
    resultView.render(model.getSearchResultsPage());
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
  resultView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView._addHandlerClick(controlpagination);
};
init();
