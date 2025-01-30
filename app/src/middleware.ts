import { type NextRequest, NextResponse } from 'next/server'
import verifyToken from './data/verify-token'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const authentication = token ? await verifyToken(token) : false

    if (!authentication && (request.nextUrl.pathname.startsWith('product'))
    ) {
        return NextResponse.redirect(new URL('/user', request.url))
    }

    if (authentication && request.nextUrl.pathname.startsWith('user')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}