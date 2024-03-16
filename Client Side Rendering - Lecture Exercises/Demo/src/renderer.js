const pattern = new RegExp('%%(.+?)%%', 'gm');
const cache = {}

export async function loadTemplate(name) {
    const url = `/templates/${name}.html`;

    if (cache[name] == undefined) {
        const res = await fetch(url);
        cache[name] = await res.text();
    }
    return cache[name];
}

export async function render(name, context) {
    const template = await loadTemplate(name);
    return template.replace(pattern, (match, name) => {
        console.log(name, '->', context[name]);

        return context[name];
    });
}

