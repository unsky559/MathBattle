import {apiGetRequest, apiPostRequest} from "../apiRequest";

class userState {
    constructor() {
        this.callbacks = [];
        this.userData = false;

        //flag to understand that user is no logged or just connected and need to get actual data
        this.hasUpdateFromServer = false;
    }

    /**
     * Update userdata object and calls onUpdate callbacks
     * @param userData {object} - new object for userData
     * */
    set currentUserData (userData) {
        if(typeof userData === 'object'){
            this.userData = userData;
            this.callbacks.forEach(val => val.call(null, userData) );
            this.hasUpdateFromServer = true;
        }else {
            console.warn("You send me not Object, userState does not change");
        }
    }

    /**
     * Get actual optimized data of current logged user
     * */
    async getCurrentUserData () {
        if(this.hasUpdateFromServer){
            return this.userData;
        }else{
            return this.getDataFromServer();
        }
    }

    /**
     * Make request to server and update currentUserData
     * */
    async getDataFromServer(){
        return apiGetRequest("account").then((r) => {
            switch (r.status){
                case 200:
                    return r.json();
                case 401:
                    return {};
                default:
                    throw new Error("Error in init function. Something unexpected happened on server");
            }
        }).then((data) => {
            this.currentUserData = data;
            return data;
        });
    }

    /**
     * Main function that checks if object is user object.
     * Answers to an question: "Is user logged in?"
     * */
    checkLoggedData(data){
        return data.hasOwnProperty('username');
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
    async isLogged () {
        if(this.hasUpdateFromServer){
            return this.checkLoggedData(this.userData);
        }else{
            return this.getDataFromServer().then((data) => {
                return this.checkLoggedData(data);
            })
        }
    }

    /**
     * Logout from account
     * */
    logout () {
        return apiPostRequest("logout", {}).then(() => {
            this.currentUserData = {};
        });
    }

    login () {
        this.hasUpdateFromServer = false;
        return this.getDataFromServer();
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


