import "core-js/stable";
import "regenerator-runtime/runtime";
//
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// const recipeContainer = document.querySelector(".recipe");

// https://forkify-api..com/v2

///////////////////////////////////////
console.log(model.state);
const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  recipeView.renderSpinner();
  // load recipe
  await model.loadRecipe(id);
  //rendering recipe
  recipeView.render(model.state.recipe);
  try {
  } catch (err) {
    alert(err);
  }
  // controlRecipes();
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
