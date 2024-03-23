import { getRecipes } from '../data/recipes.js';
import { render, html, page } from '../lib.js';
import { createSubmitHandler, parseQuery } from '../util.js';
import { paginator } from './paginator.js';

const loader = () => html`<p>Loading &hellip;</p>`;

const catalogTemplate = (recipes, page, pages, search = '', onSearch) => html`
<h1>Recipes Catalog</h1>
<form @submit=${onSearch}>
    <label>Search: <input type="text" name="search" .value=${search}></label>
</form>
${paginator(page, pages)}
<ul>
    ${recipes.map(recipeTemplate)}
</ul>`;

const recipeTemplate = (recipe) => html`
<li>
    <p>${recipe.name}<p>
</li>`;

export async function showCatalog(ctx) {
    const query = parseQuery(ctx.querystring);

    render(loader());

    const page = Number(query.page) || 2;
    const { recipes, pages } = await getRecipes(query.search, page);

    render(catalogTemplate(recipes, page, pages, query.search, createSubmitHandler(onSearch)));
}

function onSearch({ search }) {
    if (!search) {
        page.redirect('/');
    } else {
        page.redirect(`?search=${search}`);
    }
}