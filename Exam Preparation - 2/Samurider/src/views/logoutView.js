import { logout } from "../data/users.js";

export async function logoutView(){
    await logout();
}