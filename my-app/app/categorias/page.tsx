'use client';

import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import CategoriaCard from "@/components/CategoriaCard/CategoriaCard";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar os produtos');
    }
    return response.json();
};

export default function CategoriasPage() {
    const { data, error, isLoading } = useSWR<Product[]>(
        'https://deisishop.pythonanywhere.com/products/',
        fetcher
    );

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Erro!</p>
                    <p>Não foi possível carregar as categorias.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 text-lg">A carregar categorias...</p>
                </div>
            </div>
        );
    }

    const categorias = Array.from(
        new Set(data?.map(p => p.category))
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Categorias
            </h1>
            <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {categorias.map(cat => (
                    <CategoriaCard key={cat} categoria={cat} />
                ))}
            </section>
        </main>
    );
}