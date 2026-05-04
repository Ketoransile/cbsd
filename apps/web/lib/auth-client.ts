import { createAuthClient } from "better-auth/react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
    // you can pass client configuration here
})

export const { signIn, signUp, signOut, useSession } = authClient
