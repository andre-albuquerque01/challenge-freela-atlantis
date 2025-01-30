import { env } from "@/env";

export default function ApiServer(path: string, init: RequestInit) {
    const baseUrl = env.SERVER_URL
    const apiPrefix = 'v1/'
    const url = new URL(apiPrefix.concat(path), baseUrl)

    return fetch(url, init)
}