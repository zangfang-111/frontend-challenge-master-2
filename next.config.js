/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  baseUrl: '',
  images: {
    loader: 'custom',
    domains: ['scope-content-prod.s3.eu-central-1.amazonaws.com'],
  },
};
