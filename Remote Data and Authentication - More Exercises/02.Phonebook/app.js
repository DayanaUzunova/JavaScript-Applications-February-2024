function attachEvents() {
    //първо си взимаме линка
    const URL = "http://localhost:3030/jsonstore/phonebook";
    const urlRef = document.getElementById("phonebook");

    //взимаме референция ктъм бутона btnLoad и му слагаме event listener
    document.getElementById("btnLoad").addEventListener("click", onLoadAllRecords);
    document.getElementById("btnCreate").addEventListener("click", onCreateRecord);

    async function onCreateRecord(e){
        //взимаме си референция към двата input-a
        let personRef = document.getElementById("person");
        let phoneRef = document.getElementById("phone");

        //взимаме си техните стойности
        let person = personRef.value;
        let phone = phoneRef.value;
        
        //ако полетата са празни не правим нищо
        if(!person || !phone){
            return;
        }
        //ако не са празни, можем да направим заявка
        let data = {
            //метод за създаване на заявка
            method: "POST",
            //типът на хедърите
            headers: {
                "Content-type": "application/json"
            },
            //данните, които искаме да изпратим
            body: JSON.stringify({person, phone})
        }
        //изчакваме да се изпълни заявката и да се запазят данните в базата
        await fetch(URL, data);
        onLoadAllRecords();

        //зачистваме полетата
        personRef.value = "";
        phoneRef.value = "";
    }
    //правим си асинхронна функция
    async function onLoadAllRecords(e){
        //взимаме си респонса
        let response = await fetch(URL);
        //взимаме си датата в json()
        let data = await response.json();
        urlRef.innerHTML = "";

        //итерираме по всички записи и закачаме едно li
        Object.values(data).forEach(rec => {
            createAndAppendLi(rec);
        })
    }

    function createAndAppendLi(data){
        //създаваме едно ли
        let li = document.createElement("li");
        //задаваме му textContent, което идва от data-та от базата
        li.textContent = `${data.person}: ${data.phone}`;

        //създаваме delete бутона
        let btn = document.createElement("button");
        btn.textContent = "Delete";
        //добавяме id-то като атрибут, който е пристигнал от базата
        btn.dataset.id = data._id;

        //закачаме му listener
        btn.addEventListener("click", onDelete);
        //закачаме ги към li-то
        li.appendChild(btn);
        urlRef.appendChild(li);
    }
    
    async function onDelete(e){
        //id-то на човека, който е добавен в data
        let id = e.target.dataset.id;
        //правя заявка към url, който има дадената стойност и id-то на човека, който искаме да изтрием 
        await fetch(URL + "/" + id, {method: "DELETE"});
        onLoadAllRecords();
    }    

}

attachEvents();