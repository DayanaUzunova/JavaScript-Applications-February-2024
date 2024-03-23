const container = document.createElement('section');
container.id = 'notification';

document.body.appendChild(container);

export function notify(message, type) {
    const element = document.createElement('article');
    element.className = 'notification fade-in';

    if (type == 'error') {
        element.classList.add('error');
    } else if (type == 'success') {
        element.classList.add('success');
    }

    element.textContent = message;

    element.addEventListener('click', remove);

    container.appendChild(element);

    if (type != 'error') {
        setTimeout(remove, 2500);
    }

    function remove() {
        element.classList.add('fade-out');
        setTimeout(() => element.remove(), 500);
    }
}