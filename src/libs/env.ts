import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    LOGTAIL_SOURCE_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_AUTH_GOOGLE_ID: z.string().optional(),
    NEXT_PUBLIC_AUTH_GOOGLE_SECRET: z.string().optional(),
    NEXT_PUBLIC_AUTH_SECRET: z.string().optional(),
    NEXT_PUBLIC_NEXTAUTH_URL: z.string().optional(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().optional(),
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: z.string().optional(),
    NEXT_PUBLIC_API_URL: z.string().optional(),
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: z.string().optional(),
  },
  runtimeEnv: {
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
    NEXT_PUBLIC_AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    NEXT_PUBLIC_AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    NEXT_PUBLIC_AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: process.env.LIVEBLOCKS_PUBLIC_KEY,
  },
});
