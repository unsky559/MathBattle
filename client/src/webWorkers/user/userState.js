import {apiGetRequest} from "../apiRequest";
import {useDispatch} from "react-redux";

class userState {
    callbacks = [];
    userData = {};

    /**
     * Update userdata object and calls callbacks
     * @param userData {object} - new object for userData
     * */
    private update (userData) {
        this.userData = userData;
        this.callbacks.forEach( val => val.call() );
    }

    /**
     * Return status of current logged user.
     * @return true if is user logged in.
     * @return false if is user is not logged in.
     * @example
     * if (userState.isLogged()) {
     *     // do the logged things;
     * }
     * */
    isLogged () {
        return this.userData.hasOwnProperty("username");
    }

    /**
     * Updates user logged state
     * @example
     * userState.updateUserState ({...userObject});
     * */
    updateUserState (userObject) {
        this.update(userObject);
    }

    /**
     * Logout from account
     * */
    logout () {
        this.update({});
    }

    /**
     * Make call when data has changed
     * @param callback {function} - Callback function
     * */
    onUpdate (callback) {
        this.callbacks.push(callback);
    }

}

export default new userState();


