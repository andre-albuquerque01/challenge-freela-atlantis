export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-transparent bg-forum-gradient-2">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <p className="text-white">Carregando...</p>
    </div>
  )
}
