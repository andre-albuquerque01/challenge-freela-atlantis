'use server'

import ApiError from "@/data/api-error";
import ApiServer from "@/data/api-server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";


// User
export async function RegisterUser(state: { ok: boolean; data: null; error: string }, request: FormData) {
    const schema = z.object({
        name: z.string()
            .min(3, "O nome deve ter pelo menos 3 caracteres.")
            .max(120, "O nome não pode exceder 120 caracteres.")
            .regex(/^[^<>]*$/, "O nome não pode conter caracteres especiais como < ou >."),
        email: z.string()
            .email("O email deve ser válido.")
            .min(2, "O email deve ter pelo menos 2 caracteres.")
            .max(255, "O email não pode exceder 255 caracteres."),
        password: z.string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial.")
            .refine(value => !/password/i.test(value), "A senha não pode conter 'password'.")
    });


    const parsedData = Object.fromEntries(request.entries());

    const result = schema.safeParse(parsedData);
    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    try {
        const response = await ApiServer("register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(result.data),
        });

        if (response.status === 201) {
            return { ok: true, error: "", data: null };
        }

        const data = await response.json();

        if (data.error === 'Email já em uso.') {
            return { ok: false, error: 'Email já em uso.', data: null };
        }

        throw new Error("Não foi possível registrar o usuário");
    } catch (error) {
        return ApiError(error);
    }
}

export async function LoginUser(
    state: { ok: boolean; data: null; error: string },
    request: FormData) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })

    const requestJson = Object.fromEntries(request)
    const result = authenticateBodySchema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    const cookieStore = await cookies()

    try {
        const response = await ApiServer('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })

        const { token } = await response.json()

        if (response.status !== 200) {
            return { ok: false, error: "Email ou senha inválida.", data: null };
        }

        cookieStore.set('token', token, {
            expires: Date.now() + 2 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        })

    } catch (error) {
        return ApiError(error)
    }
    redirect('/')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('token')
}

// Product
export async function getIndex(page: number) {
    try {
        const response = await ApiServer(`produtoss?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            cache: 'no-cache'
        })

        const datas = await response.json()

        const countPage = datas.meta.last_page
        const data = datas.data

        return { data, countPage }
    } catch (error) {
        console.error(error);
        return { data: [], countPage: 0 }
    }
}


export async function getById(id: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    try {
        const response = await ApiServer(`produtos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-cache'
        })

        const data = await response.json()

        return data.data
    } catch (error) {
        return ApiError(error)
    }
}

export async function deleteProduct(id: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    try {
        await ApiServer(`produtos/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        revalidatePath('/')
    } catch (error) {
        console.error(error);
    }
}

export async function createProduct(state: { ok: boolean; data: null; error: string }, request: FormData) {
    const schema = z.object({
        name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres").max(60, "O nome não pode exceder 60 caracteres")
            .regex(/^[^<>]*$/, "O nome não pode conter caracteres especiais como < ou >"),
        description: z.string().min(3, "A descrição precisa ter pelo menos 3 caracteres").max(100, "A descrição não pode exceder 100 caracteres")
            .regex(/^[^<>]*$/, "A descrição não pode conter caracteres especiais como < ou >"),
        preco: z.number().max(60, "O preço não pode exceder 60").refine(value => value > 0, "O preço deve ser maior que 0"),
        disponible: z.number().min(0, "Disponibilidade deve ser 0 (indisponível) ou 1 (disponível)").max(1, "Disponibilidade deve ser 0 (indisponível) ou 1 (disponível)"),
    });

    const parsedData = Object.fromEntries(request.entries());

    const result = schema.safeParse(parsedData);

    if (!result.success) {
        const formattedErrors = result.error.errors.map(e => `* ${e.message}`).join(" * ");
        return { ok: false, error: formattedErrors, data: null };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        await ApiServer("product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.data),
        });
        return { ok: true, error: '', data: null };
    } catch (error) {
        return ApiError(error);
    }
}

export async function updateProduct(request: object) {
    const schema = z.object({
        id: z.coerce.number(),
        name: z.coerce.string().min(3, "O nome precisa ter pelo menos 3 caracteres").max(60, "O nome não pode exceder 60 caracteres")
            .regex(/^[^<>]*$/, "O nome não pode conter caracteres especiais como < ou >"),
        description: z.string().min(3, "A descrição precisa ter pelo menos 3 caracteres").max(100, "A descrição não pode exceder 100 caracteres")
            .regex(/^[^<>]*$/, "A descrição não pode conter caracteres especiais como < ou >"),
        preco: z.coerce.number().max(60, "O preço não pode exceder 60").refine(value => value > 0, "O preço deve ser maior que 0"),
        disponible: z.coerce.number().min(0, "Disponibilidade deve ser 0 (indisponível) ou 1 (disponível)").max(1, "Disponibilidade deve ser 0 (indisponível) ou 1 (disponível)"),
    });

    const result = schema.safeParse(request);

    if (!result.success) {
        const formattedErrors = result.error.errors.map(e => `* ${e.message}`).join(" * ");
        return formattedErrors;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        await ApiServer(`produtos/${result.data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.data),
        });

        revalidatePath('/');

        return 'success';
    } catch (error) {
        console.error(error);
        return "Não foi possível atualizar o produto";
    }
}

