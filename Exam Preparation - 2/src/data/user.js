import { clearUserData, setUserData, updateNavigation } from '../utils.js';
import { get, post } from './requests.js'
import { page } from '../lib.js';

// MOJE DA SE NALOJAT OSHTE ZAQVKI SPORED USLOVIETO,PRIMERNO DA ZAREJDAME DETAILI

const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export async function login(email, password){
    const result = await post (endPoints.login, {email, password});
    setUserData(result)
    updateNavigation()
    page.redirect('/') // prashta me v home AKO se logna
}

export async function register(email, password){
    const result = await post (endPoints.register, {email, password});
    setUserData(result)
    page.redirect('/') // prashta me v home AKO se logna
    updateNavigation()
}

export async function logout(){
    const promise = get(endPoints.logout);
    clearUserData();
    await promise;
    page.redirect('/') // prashta me v home shtom se logoutna
    updateNavigation()
}