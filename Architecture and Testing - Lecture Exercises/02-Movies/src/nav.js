const root = document.querySelector('main');

/**
 * @type {{[link: string]: () => HTMLElement}}
 */
//пази всички views
let views = {}

export function init(inViews) {
    views = inViews;
//при стартиране минава през всички линкове в таблицата
    for (const linkId in views) { 
        //ако линка го има, слага лисънър
        document.getElementById(linkId)?.addEventListener('click', onClick);
    }
}

function onClick(event) {
    const linkId = event.target.id;
    if (views[linkId]) {
        event.preventDefault();
        showView(linkId);
    }

}
export async function showView(linkId, param) {
    //проверява дали даденото id го има
    const view = views[linkId];

    //ако съществува ще върне функция, ако я има я изпълнява 
    if (typeof view == 'function') {
        //html element(section)
        const section = await view(param);
        //закачаме я за DOM дървото
        root.replaceChildren(section);
    }
}