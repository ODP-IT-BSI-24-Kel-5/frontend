/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'walled-fe.vercel.app', 'kelompok3.serverku.org'],
    },
    webpack: (config) => {
        config.infrastructureLogging = {
            level: 'error',
        };
        return config;
    },
}


export default nextConfig;
