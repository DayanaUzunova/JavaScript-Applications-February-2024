//step 14
import { html } from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';

const createViewTemp = (error) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Create New Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <!--changing the valid state if wrong input step 17-->
          <input
            class="form-control
            ${!!error ? (error.make ? 'is-invalid' : 'is-valid') : ''}"
            id="new-make"
            type="text"
            name="make"
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control
            ${!!error ? (error.model ? 'is-invalid' : 'is-valid') : ''}"
            id="new-model"
            type="text"
            name="model"
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control
            ${!!error ? (error.year ? 'is-invalid' : 'is-valid') : ''}"
            id="new-year"
            type="number"
            name="year"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input
            class="form-control
            ${!!error ? (error.description ? 'is-invalid' : 'is-valid') : ''}"
            id="new-description"
            type="text"
            name="description"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control
            ${!!error ? (error.price ? 'is-invalid' : 'is-valid') : ''}"
            id="new-price"
            type="number"
            name="price"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input
            class="form-control
            ${!!error ? (error.img ? 'is-invalid' : 'is-valid') : ''}"
            id="new-image"
            type="text"
            name="img"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class="form-control" id="new-material" type="text" name="material" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>
`;
//step 15 repeating
let context = null;
export function showCreateView(ctx) {
  context = ctx;
  context.render(createViewTemp(null));
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  let { make, model, year, description, price, img, material } = Object.fromEntries(formData);
  year = Number(year);
  //step 16 magic is here
  let error = {};
  let hasError = false;

  if (make.length < 4) {
    error.make = true;
    hasError = true;
  }
  if (model.length < 4) {
    error.model = true;
    hasError = true;
  }
  if (year < 1950 || year >= 2050) {
    error.year = true;
    hasError = true;
  }
  if (description.length < 10) {
    error.description = true;
    hasError = true;
  }
  if (!price || Number(price) < 0) {
    error.price = true;
    hasError = true;
  }
  if (!img) {
    error.img = true;
    hasError = true;
  }
  if (hasError) {
    return context.render(createViewTemp(error));
  }
  price = Number(price);
  await dataService.createFurniture({ make, model, year, description, price, img, material });
  context.goTo('/');
}
