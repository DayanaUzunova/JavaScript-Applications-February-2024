import { page } from '../lib/lib.js';

export function addGoTo() {
    return function (ctx, next) {
        ctx.goTo = page.redirect;
        next();
    };
}
