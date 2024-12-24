const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log(process.env.REACT_APP_SETUPPROXY_URL);
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_SETUPPROXY_URL,
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Proxy Error: Unable to connect to server");
      },
    })
  );
};
