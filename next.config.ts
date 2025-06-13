import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // Needed if using <Image /> from next/image
  },
};

export default nextConfig;
