import { searchByQuery } from "../data/data.js";
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const searchTemp = (handler, result) => html`
   <section id="search">

<div class="form">
  <h4>Search</h4>
  <form @submit=${handler} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
  ${result ? showResultTemp(result) : ""}
</section>
`;

const showResultTemp = (result) => html`
<div class="search-result">
    ${result.length ? result.map(x => html`
    <div class="motorcycle">
        <img src="${x.imageUrl}" alt="example1" />
        <h3 class="model">${x.model}</h3>
        <a class="details-btn" href="/details/${x._id}">More Info</a>
    </div> `)
    : html`
        <h2 class="no-avaliable">No result.</h2>
    `}
    </div>

`;

  export function showSearchView(){
    const handler = createSubmitHandler(onSearch);
    render(searchTemp(handler));
  }

  async function onSearch(data, form){
    const {search} = data;

    if(!search){
        return alert('No query!')
    }

    const result = await searchByQuery(search);
    const handler = createSubmitHandler(onSearch);
    render(searchTemp(handler, result));
  }