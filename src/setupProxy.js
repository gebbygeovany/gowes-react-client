const proxy = require('http-proxy-middleware');

    module.exports = function(app) {
        app.use(proxy('/api/**', { target: 'https://gowes-market-apollo-server.herokuapp.com/' }));
        app.use(proxy('/otherApi/**', { target: 'https://gowes-market-apollo-server.herokuapp.com/' }));
    };