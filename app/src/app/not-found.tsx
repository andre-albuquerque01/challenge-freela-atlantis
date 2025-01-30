'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex justify-center items-center flex-col">
      <h1 className="font-bold text-white text-3xl">Ops! Página não encontrada.</h1>
      <Link href="/" className="text-red-600 hover:text-blue-700">
        Volte para o inicio.
      </Link>
    </div>
  )
}
