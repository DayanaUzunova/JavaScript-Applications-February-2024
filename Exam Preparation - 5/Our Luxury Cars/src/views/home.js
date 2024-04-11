const root = document.getElementById('root');

const section = document.getElementById('hero');
section.remove();

let context = {};

export function showHomeView(ctx) {
    context = ctx;
    context.render(root, section);
}