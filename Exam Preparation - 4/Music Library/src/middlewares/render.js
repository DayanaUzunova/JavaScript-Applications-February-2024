import { render } from '../lib/lib.js';
import { getUserData } from '../utils/userHelper.js';
import { layoutTemplate } from '../views/layout.js';

export function renderer(root) {
    return function (ctx, next) {
        ctx.render = renderView;
        next();
    };

    function renderView(content) {
        const userData = getUserData();
        render(layoutTemplate(userData, content), root);
    }
}
