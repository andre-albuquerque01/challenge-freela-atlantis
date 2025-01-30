'use client'

import { useRouter } from "next/navigation";
import { useActionState, } from "react";
import { createProduct } from "@/app/action";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateProductComponent() {
    const [state, action, pending] = useActionState(createProduct, {
        ok: false,
        error: '',
        data: null,
    });

    const router = useRouter();

    return (
        <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10 px-4">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Criar Produto</h1>

            <form action={action} className="flex flex-col gap-6 w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <div
                    onClick={() => router.back()}
                    className="flex items-center text-red-500 hover:text-blue-600 cursor-pointer text-sm w-fit mb-4 transition-all"
                >
                    <FaArrowLeft className="w-4 h-4 mr-2" /> Voltar
                </div>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />

                <input
                    type="number"
                    name="preco"
                    step="0.01"
                    placeholder="Preço"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />

                <select
                    name="disponible"
                    id="disponible"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                >
                    <option value={1}>Disponível</option>
                    <option value={0}>Indisponível</option>
                </select>

                <button
                    className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all font-semibold text-lg"
                    disabled={pending}
                >
                    Alterar
                </button>

                {state.error && (
                    <span className="text-red-600 text-sm text-center mt-2" aria-live="polite">
                        {state.error}
                    </span>
                )}
            </form>
        </div>
    );
}
