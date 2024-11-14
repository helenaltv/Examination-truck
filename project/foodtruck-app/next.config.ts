// next.config.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://yumyum-assets.s3-website.eu-north-1.amazonaws.com/:path*",
      },
    ];
  },
};
