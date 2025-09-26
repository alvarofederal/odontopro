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
    stripe_customer_id: string | null
    times: string[]
    adress: string | null
    phone: string | null
    status: boolean
    created_at: string | null
    updated_at: string | null
}
