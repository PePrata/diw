'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Product } from '@/app/models/interfaces';
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard";
import CarrinhoResumo from "@/components/CarrinhoResumo";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Erro ao carregar os produtos');
    }
    
    return response.json();
};

export default function ProdutosPage() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [ordenacao, setOrdenacao] = useState('');

    const { data, error, isLoading } = useSWR<Product[]>(
        'https://deisishop.pythonanywhere.com/products/',
        fetcher
    );

    useEffect(() => {
        if (data) {
            let filtered = data.filter(produto =>
                produto.title.toLowerCase().includes(search.toLowerCase())
            );

            // Aplicar ordenação
            if (ordenacao === 'nome-asc') {
                filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
            } else if (ordenacao === 'nome-desc') {
                filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
            } else if (ordenacao === 'preco-asc') {
                filtered = filtered.sort((a, b) => a.price - b.price);
            } else if (ordenacao === 'preco-desc') {
                filtered = filtered.sort((a, b) => b.price - a.price);
            }

            setFilteredData(filtered);
        }
    }, [search, data, ordenacao]);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Erro!</p>
                    <p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 text-lg">A carregar produtos...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Produtos DEISIshop
            </h1>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="">Ordenar por...</option>
                    <option value="nome-asc">Nome (A-Z)</option>
                    <option value="nome-desc">Nome (Z-A)</option>
                    <option value="preco-asc">Preço (Menor)</option>
                    <option value="preco-desc">Preço (Maior)</option>
                </select>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredData.map(produto => (
                    <ProdutoCard
                        key={produto.id}
                        produto={produto}
                    />
                ))}
            </section>

            {filteredData.length === 0 && search && (
                <p className="text-center text-gray-500 mt-8">
                    Nenhum produto encontrado para "{search}"
                </p>
            )}

            <CarrinhoResumo />
        </main>
    );
}