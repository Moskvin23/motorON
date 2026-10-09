/** @type {import('next').NextConfig} */
export default { output: 'export', trailingSlash: true, images: { unoptimized: true }, distDir: process.env.NEXT_DIST || '.next' };
