const root = document.getElementById('root');
const wrapper = document.getElementById('wrapper');

let views = {};
let context = {};

export function init(inViews, ctx) {
    views = inViews;
    context = ctx;

    wrapper.addEventListener('click', onClick);
}

function onClick(event) {
    let element = event.target;

    if (element.tagName == 'IMG') {
        element = element.parentElement;
    }
    if (element.tagName == 'A') {
        const path = element.pathname;
        console.log(path);

        if (path in views) {
            event.preventDefault();
            context.goTo(path, event);
        }
    }
}

export async function showView(path, param) {
    const view = views[path];

    if (typeof view == 'function') {
        await view(context, param);
    }
}