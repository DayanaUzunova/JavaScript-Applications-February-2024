window.addEventListener('load', solution);

function solution() {

    const main = document.getElementById('main');
    const host = 'http://localhost:3030/jsonstore/advanced/articles/';

    renderArticles();

    async function renderArticles() {

        const titlesData = await get('list');
        const articles = [];

        for (let titleData of titlesData) {
            articles.push(await createArticle(titleData));
        }
        main.replaceChildren(...articles);

    }

    async function createArticle(titleData) {

        const moreInfo = await get(`details/${titleData._id}`);
        const moreInfoElement = createElement('div', { className: 'extra' }, [
            createElement('p', {}, moreInfo.content)
        ])

        return createElement('article', { className: 'accordion' }, [
            createElement('div', { className: 'head' }, [
                createElement('span', {}, titleData.title),
                createElement('button', { className: 'button', id: titleData._id, onclick: (e) => toggleMoreInfo(e, moreInfoElement) }, 'More')
            ]),
            moreInfoElement
        ]);
    }

    function toggleMoreInfo(e, moreInfoElement) {
        const button = e.target;
        button.textContent = button.textContent == 'More' ? 'Less' : 'More';
        moreInfoElement.style.display = button.textContent == 'More' ? 'none' : 'block';
    }

    async function get(endpoint) {

        try {
            const response = await fetch(host + endpoint);

            if (!response.ok) {
                const error = await response.json();
                throw error;
            }
            const data = await response.json();
            return data;
        } catch (err) {
            alert(`Error: ${err.messsage}`);
            throw err;
        }
    }

    function createElement(tagName, attrs = {}, content = '') {

        const element = document.createElement(tagName);

        for (let attr in attrs) {

            if (attr.slice(0, 2) == 'on') {
                const event = attr.slice(2);
                element.addEventListener(event, attrs[attr]);
            } else {
                element[attr] = attrs[attr];
            }
        }

        if (typeof content == 'string') {
            element.textContent = content;
        } else {
            content.forEach(child => element.appendChild(child));
        }

        return element;
    }
}