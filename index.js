const search = require('./searches/address');
const authentication = require('./authentication');

// To include the API key header on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeApiKeyHeader = (request, z, bundle) => {
    if (bundle.authData.apiKey) {
        request.params = request.params || {};
        request.params.apiKey = bundle.authData.apiKey;
    }
    return request;
};

// We can roll up all our behaviors in an App.
const App = {
    // This is just shorthand to reference the installed dependencies you have. Zapier will
    // need to know these before we can upload
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,

    authentication: authentication,

    // beforeRequest & afterResponse are optional hooks into the provided HTTP client
    beforeRequest: [
        includeApiKeyHeader
    ],

    afterResponse: [
    ],

    // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
    resources: {
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {
    },

    // If you want your searches to show up, you better include it here!
    searches: {
        [search.key]: search
    },

    // If you want your creates to show up, you better include it here!
    creates: {
    }
};

// Finally, export the app.
module.exports = App;
