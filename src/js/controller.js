import "core-js/stable";
import "regenerator-runtime/runtime";
//
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import * as model from "./model.js";
///////////////////////////////////////\
if (module.hot) {
  module.hot.accept();
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
  try {
    resultView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    // load search result
    await model.loadSearchResult(query);
    // reander result
    console.log(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResult();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
