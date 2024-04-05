export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const entries = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        const data = Object.fromEntries(entries);

        callback(data, form);
    };
}
