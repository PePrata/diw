import Image from 'next/image';
import Link from "next/link";
import { Product } from '@/app/models/interfaces';
import { adicionarAoCarrinho } from "@/components/carrinho";

interface ProdutoCardProps {
    produto: Product;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
    const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;

    return (
        <article className="border rounded shadow p-4">
            <div className="relative h-48 w-full mb-3">
                <Image
                    src={imageUrl}
                    alt={produto.title}
                    fill
                    className="object-contain"
                />
            </div>
            <h3 className="font-semibold">{produto.title}</h3>
            <p className="text-sm text-gray-600">
                {Number(produto.price).toFixed(2)} €
            </p>
            <Link
                href={`/produtos/${produto.id}`}
                className="text-blue-600 underline mt-2 inline-block"
            >
                Ver detalhes
            </Link>

            <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="ml-auto px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
                + Adicionar
            </button>
        </article>
    );
}