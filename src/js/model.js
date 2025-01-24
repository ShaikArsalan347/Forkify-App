import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./views/config.js";
import { getJSON } from "./helpers.js";
// import { search } from "core-js/fn/symbol";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // Transform the recipe data and store it in state
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 🔴🔴`);
    throw err;
  }
};
export const loadSearchResult = async function (query) {
  state.search.query = query;
  const data = await getJSON(`${API_URL}?search=${query}`);
  console.log(data);
  try {
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 🔴🔴`);
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
