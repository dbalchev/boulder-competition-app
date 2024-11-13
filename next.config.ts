import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'build',
    basePath: process.env.BASE_PATH,
}

export default nextConfig
