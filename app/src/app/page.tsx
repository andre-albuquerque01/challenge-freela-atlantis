import Link from "next/link";
import { getIndex } from "./action";
import { cookies } from "next/headers";
import { RemoveIten } from "@/components/product/delete-product";
import { LogoutComponent } from "@/components/user/delete-product";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export interface ProductInterface {
  id: number;
  name: string;
  preco: number;
  description: string;
  disponible: number;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;

  const data = await getIndex(page);
  const products = data.data as ProductInterface[];
  const countPage = data.countPage;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
        {!token ? (
          <div className="flex justify-between items-center mb-4">
            <Link href="/user">
              <p className="bg-forum-gradient-3 p-3 hover:bg-slate-400 rounded cursor-pointer">Login</p>
            </Link>
            <Link href="/user/create">
              <p className="bg-forum-gradient-3 p-3 hover:bg-slate-400 rounded cursor-pointer">Sing Up</p>
            </Link>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <Link href="/product/insert">
              <p className="bg-forum-gradient-3 p-3 hover:bg-slate-400 rounded cursor-pointer">Criar produto</p>
            </Link>
            <LogoutComponent />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-bold">R$ {product.preco}</p>
            <p className={`mt-2 ${product.disponible ? "text-blue-500" : "text-red-500"}`}>
              {product.disponible ? "Disponível" : "Indisponível"}
            </p>
            {token && (
              <div className="mt-2 flex gap-2">
                <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline">
                  Update
                </Link>
                <RemoveIten id={product.id} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-4">
        {page > 1 && (
          <Link
            href={`?page=${page - 1}`}
            className="border border-zinc-800 text-black py-2 px-4 rounded-md hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition duration-500"
          >
            Anterior
          </Link>
        )}
        {page < countPage && (
          <Link
            href={`?page=${page + 1}`}
            className="border border-zinc-800 text-black py-2 px-4 rounded-md hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition duration-500"
          >
            Próxima
          </Link>
        )}
      </div>
    </main>
  );
}