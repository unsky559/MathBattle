import {apiGetRequest} from "../apiRequest";

/**
 * Return promise isLogged result.
 * @return true Promise if is user logged in.
 * @return false Promise if is user is not logged in.
 * @example
 * isLoggedIn().then(isLogged => {
 *     if(isLogged)
 *         console.log("Logged");
 * });
 * */
export default async function isLoggedIn () {
    const result = await apiGetRequest("account");
    return result.status === 200 ? true : false;
}
