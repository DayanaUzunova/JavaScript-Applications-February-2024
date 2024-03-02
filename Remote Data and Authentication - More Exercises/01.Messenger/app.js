function attachEvents() {
    document.getElementById("refresh").addEventListener("click", onLoadMessage);
    document.getElementById("submit").addEventListener("click", onSubmit);
    const url = "http://localhost:3030/jsonstore/messenger";

    async function onSubmit(e){
        let nameRef = document.querySelector("input[name='author']");
        let textRef = document.querySelector("input[name='content']");

        let name = nameRef.value;
        let text = textRef.value;

        let data = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                author: name,
                content: text
            })
        }
        await fetch(url, data);
        nameRef.value = "";
        textRef.value = "";
    }

    async function onLoadMessage(e){
        let textArea = document.getElementById("messages");
        textArea.value = "";
        let response = await fetch(url);
        let data = await response.json();

        Object.values(data).forEach(rec => {
            textArea.value += `${rec.author}: ${rec.content}\n`;
        });
        textArea.value = textArea.value.trim();
    }
}

attachEvents();