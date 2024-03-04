export async function request(url, options) {
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const data = await res.json();

        return data;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}