async function getPosts() {
    return await fetch('http://localhost:3000/posts')
        .then((response) => response.json())
        .then((data) => data);
}

async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
        .then((response) => response.json())
        .then((data) => data);
}

async function getEmails() {
    return await fetch('http://localhost:3000/emails')
        .then((response) => response.json())
        .then((data) => data);
}

document.addEventListener('DOMContentLoaded', async function () {
    addPosts();
    addCallbackRequests();
    addEmails();

    //Create Post 
    let addPostBtn = document.querySelector('.add-post') //.是class
    let createPostBtn = document.querySelector('#v-pills-add-post-tab')  // #是id
    addPostBtn.addEventListener('click', () => createPostBtn.click())
})

async function addPosts(){
    let posts = await getPosts()
    let articles = document.querySelector('.articles-list tbody')
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
        /* 插入html文本 */
        articles.insertAdjacentHTML('beforeend', postHTML)
    })
}

async function addCallbackRequests() {
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-requests tbody');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${request.id}"></td>
            <td class="title text-nowrap">${request.phoneNumber}</td>
            <td class="date text-nowrap">${request.date.substring(0, request.date.indexOf('T'))}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}

async function addEmails() {
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails tbody');
    emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((emails) => {
        let emailHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${emails.id}"></td>
            <td class="name">${emails.name}</td>
            <td class="email">${emails.email}</td>
            <td class="date">${emails.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        <tr>
            <td colspan="5" class="text">${emails.text}</td>
        </tr>
        `;
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}


let requestsBlock = document.querySelector('#v-pills-requests');

requestsBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/callback-requests/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => window.history.go());
    }
})

let emailsBlock = document.querySelector('#v-pills-mails');

emailsBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/emails/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => window.history.go());
    }
})

let logOutBtn = document.querySelector('.log-out-btn')

logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})