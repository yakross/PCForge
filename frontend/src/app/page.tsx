import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white items-center justify-center font-sans">
      <main className="flex flex-col items-center gap-6 p-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-blue-500">
          PCForge
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Construye la PC de tus sueños con las mejores herramientas y asesoramiento.
        </p>
        <div className="flex gap-4 mt-8">
          <Link 
            href="/build" 
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Comenzar a armar
          </Link>
          <Link 
            href="/catalog" 
            className="px-6 py-3 rounded-full border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </main>
    </div>
  );
}
