const withMDX = require("@next/mdx")()

// handle SVGs
// https://medium.com/frontend-digest/how-to-import-svgs-into-nextjs-8ec6100e613f
const config = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
module.exports = withMDX(config)
