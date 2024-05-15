const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    '/todo',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};