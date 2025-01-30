import { z } from "zod"

const envSchema = z.object({
    SERVER_URL: z.string().default("http://localhost/api/v1"),
    JWT_SECRET: z.string().default("http://localhost:3333"),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("❌ Invalid environment variables", _env.error.format())
    throw new Error('❌ Invalid environment variables')
}

export const env = _env.data