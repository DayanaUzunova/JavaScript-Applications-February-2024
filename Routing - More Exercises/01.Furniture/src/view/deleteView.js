import { dataService } from '../service/dataService.js';
//step 19
export async function deleteItem(ctx) {
  const id = ctx.params.id;
  const res = confirm('delete');
  if (res) {
    await dataService.delFurniture(id);
    ctx.goTo('/');
  }
}
