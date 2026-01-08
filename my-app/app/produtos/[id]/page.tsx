import { Product } from '@/app/models/interfaces';
import Link from "next/link";


interface Props {
    params: Promise<{ id: string }>;
}


async function getProduto(id: string): Promise<Product | null> {
    const res = await fetch(
        `https://deisishop.pythonanywhere.com/products/${id}`,
        { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const data = await res.json();

    return {
        ...data,
        price: Number(data.price),
    };
}

export default async function ProdutoPage({ params }: Props) {
    const { id } = await params;

    const produto = await getProduto(id);

    if (!produto) {
        return <p className="p-8">Produto não encontrado</p>;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Link
                href="/produtos"
                className="inline-block mb-6 text-blue-600 hover:underline"
            >
                ← Voltar
            </Link>
            <img
                src={produto.image}
                alt={produto.title}
                className="h-64 mx-auto mb-6"
            />

            <h1 className="text-3xl font-bold">
                {produto.title}
            </h1>

            <p className="text-gray-600 my-4">
                {produto.description}
            </p>

            <p className="font-bold text-xl">
                {produto.price.toFixed(2)} €
            </p>
        </main>
    );
}
