import { logout } from "../data/user.js";



export async function logoutView(){
    console.log("Logging out view...")
    await logout()
}