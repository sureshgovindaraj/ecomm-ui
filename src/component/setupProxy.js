const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        createProxyMiddleware('/backend/search/products',{
            target: 'https://www.blibli.com',
            changeOrigin: true
        })
    )
}