import webpack from 'webpack';

const nextConfig = {
  images:{
    domains:[
      "3cull90znh.ufs.sh",
    ]
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );

    return config;
  },
};

export default nextConfig;
