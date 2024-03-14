const headers = require('../services/headers');
const errorHandle = require('../services/errorHandle');

const http = {
    core ({ req, res }) {
        res.writeHead(200, headers);
        res.end();
    },
    notFound ({ req, res }) {
        errorHandle(res, 404, 'routing');
    }
};

module.exports = http;