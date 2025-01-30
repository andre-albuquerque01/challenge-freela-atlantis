'use client'
import { deleteProduct } from "@/app/action"

export const RemoveIten = ({ id }: { id: number }) => {
    const handleRemove = async (
        id: number,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault()
        if (confirm('Deseja excluir o item?')) await deleteProduct(id)
    }
    return (
        <div title="Remover item" className="text-red-500 hover:underline">
            <button onClick={(e) => handleRemove(id, e)}>
                Delete
            </button>
        </div>
    )
}