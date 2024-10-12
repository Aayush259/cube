import { Config } from "@/interfaces/interface";

const config: Config = {
    API_ENDPOINT: String(process.env.NEXT_PUBLIC_API_ENDPOINT),
    PROJECT_ID: String(process.env.NEXT_PUBLIC_PROJECT_ID),
    DATABASE_ID: String(process.env.NEXT_PUBLIC_DATABASE_ID),
    COLLECTION_ID_POSTS: String(process.env.NEXT_PUBLIC_COLLECTION_ID_POSTS),
    COLLECTION_ID_PROFILE: String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
    AVATAR_ID: String(process.env.NEXT_PUBLIC_AVATAR_ID),
    FEATURED_IMAGE_ID: String(process.env.NEXT_PUBLIC_FEATURED_IMAGE_ID)
}

export default config;
