/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/three-scenes/personal-game",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicpath: "/_next/static/images",
          outputpath: "static/images/",
        },
      },
    });

    // for bin file
    config.module.rules.push({
      test: /\.(bin)$/,
      use: {
        loader: "file-loader",
        options: {
          publicpath: "/_next/static/images",
          outputpath: "static/images/",
          name: "[name].[ext]", // keep the original name
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
