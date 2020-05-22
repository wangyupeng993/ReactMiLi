import proxy from "http-proxy-middleware";

/*const exampleProxy = proxy({
    target: 'https://xmmlwl.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        '^/api':'/api'
    }
})*/

module.exports = function (app:any) {
    app.use('/api', proxy({
        target: 'https://xmmlwl.com',
        secure: false,
        changeOrigin: true
    }))
}
