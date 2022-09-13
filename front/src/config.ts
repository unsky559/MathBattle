const server = {
    apiServer: "localhost:8000",
    apiURI: "/api",
};
const config = {
    apiServer: server,
    /**
     * Get link to specified api
     * @param {string} api
     * @return string - Link to api
     */
    apiPath(api: string) {
        return server.apiServer + server.apiURI + "/" + api;
    },
};
export default config;

