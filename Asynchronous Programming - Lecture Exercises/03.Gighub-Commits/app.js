 // Try it with Fetch API
    const list = document.getElementById('commits');
    
    function loadCommits() {    
        const username = document.getElementById('username').value;
        const repo = document.getElementById('repo').value;

        const url = `https://api.github.com/repos/${username}/${repo}/commits`
    
        fetch(url)
        .then(onHeaders)
        .then(displayCommits)
        .catch(onError);
    }
    
    function onHeaders(response){
        if(!response.ok){
            throw "Error!";
        }
        return response.json();
}

function displayCommits(data){
    list.replaceChildren(...data.map(createListItem))

}

function onError(error){
    list.innerHTML = '<li>Error 404 Not Found</li>';
}

function createListItem({ commit: { author: { name }, message } }){
   const item = document.createElement('li');
   item.textContent = `${name}: ${message}`;

   return item;
}
