import {DefaultSession} from "next-auth"

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"]
    }
}

interface User {
    id: string
    name: string | null
    email: string | null
    emailVerified: null | string | boolean
    image: string | null
    stripeCustomerId: string | null
    times: string[]
    adress: string | null
    phone: string | null
    status: boolean
    createdAt: string | null
    updatedAt: string | null
}
