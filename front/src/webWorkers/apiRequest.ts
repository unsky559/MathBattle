import config from "../config.ts";

/**
 * Make POST request to an API that defined in config.js
 * @param api {string} - API method to request
 * @param data {object} - Data object to send. Will convert to json
 * @return Promise - Response will contain fetch promise response
 * */
export const apiPostRequest = (api: string, data: Record<string, any>) => {
    return fetch(config.apiPath(api), {
        method: 'POST',
        mode: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((resp) => {
        return resp;
    });
}

/**
 * Make GET request to an API that defined in config.js
 * @param api {string} - API method to request
 * @return Promise - Response will contain fetch promise response
 * */
export const apiGetRequest = (api: string) => {
    return fetch(config.apiPath(api), {
        method: 'GET',
        mode: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((resp) => {
        return resp;
    });
}
