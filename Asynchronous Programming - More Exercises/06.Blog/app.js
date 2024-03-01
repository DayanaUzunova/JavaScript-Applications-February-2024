// function attachEvents() {
//     document.getElementById("btnLoadPosts").addEventListener("click", loadPost);
//     document.getElementById("btnViewPost").addEventListener("click", viewComments);
// }

// async function loadPost(){
//     const selectOp = document.getElementById("posts");
//     const url = "http://localhost:3030/jsonstore/blog/posts";
//     selectOp.innerHTML = "";
//     const response = await fetch(url);
//     const data = await response.json();

//     Object.values(data).forEach(post => {
//         const op = document.createElement("option");
//         op.value = post.id;
//         op.textContent = post.title;
//         selectOp.appendChild(op);
//     });
// }

// async function viewComments(){
//     const postUrl = "http://localhost:3030/jsonstore/blog/posts";
//     const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";

//     const selectedOp = document.getElementById("posts").selectedOptions[0].value;
//     const titleElement = document.getElementById("post-title");
//     const postBodyElement = document.getElementById("post-body");
//     const postUlElement = document.getElementById("post-comments");

//     postUlElement.innerHTML = "";

//     const postResponse = await fetch(postUrl);
//     const postData = await postResponse.json();

//     const commentsResponse = await fetch(commentsUrl);
//     const commentsData = await commentsResponse.json();

//     const selectedPost = Object.values(postData).find(post => post.id == selectedOp);
//     titleElement.textContent = selectedPost.title;
//     postBodyElement.textContent = selectedPost.body;

//     const comments = Object.values(commentsData).filter(c => c.postId === selectedOp);
//     comments.forEach(c => {
//         const li = document.createElement("li");
//         li.textContent = c.text;
//         postUlElement.appendChild(li);
//     });

// }

const host = 'http://localhost:3030/jsonstore/blog/';

function attachEvents() {

    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostsBtn = document.getElementById('btnViewPost');
    const postsEl = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    loadPostsBtn.addEventListener('click', loadPosts);
    viewPostsBtn.addEventListener('click', viewPosts);

    const posts = [];

    async function loadPosts() {
        postsEl.innerHTML = '';

        const postsData = await get('posts');

        for (let value of Object.values(postsData)) {
            const option = document.createElement('option');
            option.value = value.id;
            option.textContent = value.title;
            postsEl.appendChild(option);
            posts.push({
                title: value.title,
                body: value.body
            });
        }
    }


    async function viewPosts() {
        const selectedOption = Array.from(document.querySelectorAll('option')).find(option => option.selected);
        if (selectedOption == undefined) return;

        const commentsData = await get('comments');

        const body = posts.find(post => post.title == selectedOption.textContent).body;
        postTitle.textContent = selectedOption.textContent;
        postBody.textContent = body;
        postComments.innerHTML = '';
        for (let comment in commentsData) {
            if (commentsData[comment].postId == selectedOption.value) {
                const li = document.createElement('li');
                li.id = commentsData[comment].id;
                li.textContent = commentsData[comment].text;
                postComments.appendChild(li);
            }
        }
    }

}

async function get(endpoint) {
    try {
        const response = await fetch(`${host}${endpoint}`);
        if (!response.ok) throw new Error();

        const data = await response.json();
        return data;
    } catch (e) {
        alert(`Error: ${e.message}`);
    }
}

attachEvents();