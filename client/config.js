const server = {
    apiServer: "http://localhost:3000",
    apiURI: "/api",
};
const config = {
    apiServer: server,
    apiPath: (api) => server.apiServer + server.apiURI + api,
};
export default config;

