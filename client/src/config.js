const server = {
    apiServer: "http://localhost:3000",
    apiURI: "/api",
};
const config = {
    apiServer: server,
    /**
     * Get link to specified api
     * @param {string} api
     * @return string - Link to api
     */
    apiPath(api) {
        return server.apiServer + server.apiURI + "/" + api;
    },
};
export default config;

