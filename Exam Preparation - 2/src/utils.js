export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'))
}

export function clearUserData() {
    localStorage.removeItem('user')
}

export function createSubmitHandler(calllback) {
    return function (event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        calllback(Object.fromEntries(data), event.target)
    }
}

export function isOwner(itemOwnerId){
    return getUserData()?._id === itemOwnerId
}
// const userDiv = document.querySelector("div.user");

export function updateNavigation() {
    const userNav = document.querySelector("div.user")
    const guestNav = document.querySelector("div.guest")
    const userData = getUserData();

// PROVERQVA DALI SME LOGNATI ILI SME GUESTS I POKAZVA RAZLICHNO SUDURJANIE SPORED TOVA KAKVI SME..
    if (userData) {
        guestNav.style.display = "none"
        userNav.style.display = "block"
    }else{
        guestNav.style.display = "block"
        userNav.style.display = "none"
    }
}