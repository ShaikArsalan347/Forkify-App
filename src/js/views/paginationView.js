import View from "./view.js";
import icons from "url:../../img/icons.svg";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _curPage() {
    return this._data.page;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._curPage();
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (this._data.page === 1 && numPages > 1) {
      return `${this._generateMarkupButtonNext(curPage)}`;
    }

    if (this._data.page === numPages && numPages > 1) {
      return `${this._generateMarkupButtonPrev(curPage)}`;
    }

    if (this._data.page < numPages) {
      return `${this._generateMarkupButtonNext(
        curPage,
      )} ${this._generateMarkupButtonPrev(curPage)}`;
    }

    return ""; // Or return something else if only one page
  }

  _generateMarkupButtonNext(curPage) {
    return `
       <button data-goto="${
         curPage + 1
       }" class="btn--inline pagination__btn--next">  
          <span> Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
  }

  _generateMarkupButtonPrev(curPage) {
    return `
       <button data-goto="${
         curPage - 1
       }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span> Page ${curPage - 1}</span>
        </button>`;
  }
}

export default new paginationView();
