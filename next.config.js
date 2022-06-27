/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
	  domains: ['localhost','rickandmortyapi.com'], // é necessário registrar o dominio da url Image utilizada no componente Card
  },
}

module.exports = nextConfig
