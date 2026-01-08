'use client';

import Image from 'next/image';
import { useEffect, useState } from "react";
import { Product } from "@/app/models/interfaces";
import { getCarrinho, removerDoCarrinho, limparCarrinho} from "@/components/carrinho";

export default function CarrinhoResumo() {
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [estudante, setEstudante] = useState(false);
    const [cupao, setCupao] = useState('');
    const [comprando, setComprando] = useState(false);

    function atualizar() {
        setProdutos(getCarrinho());
    }

    useEffect(() => {
        atualizar();
        window.addEventListener("storage", atualizar);
        return () => window.removeEventListener("storage", atualizar);
    }, []);

    const comprar = async () => {
        if (produtos.length === 0) {
            alert("Carrinho vazio!");
            return;
        }

        setComprando(true);

        try {
            const response = await fetch("https://deisishop.pythonanywhere.com/buy/", {
                method: "POST",
                body: JSON.stringify({
                    products: produtos.map(produto => produto.id),
                    name: "",
                    student: estudante,
                    coupon: cupao
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            
            // Limpar carrinho após compra bem-sucedida
            limparCarrinho();
            atualizar();
            
            alert(`Compra realizada com sucesso!\nTotal pago: ${data.totalCost.toFixed(2)} €\nReferência: ${data.reference}`);
            
            // Limpar estados
            setEstudante(false);
            setCupao('');
            
        } catch (error) {
            console.error("Erro ao comprar:", error);
            alert("Erro ao realizar a compra. Tente novamente.");
        } finally {
            setComprando(false);
        }
    };

    const total = produtos.reduce((soma, p) => soma + Number(p.price), 0);

    if (produtos.length === 0) {
        return <p className="mt-6 text-gray-500">Carrinho vazio</p>;
    }

    return (
        <section className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">🧺 Carrinho</h2>
            
            <ul className="space-y-3 mb-6">
                {produtos.map(produto => {
                    const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;
                    return (
                        <li
                            key={produto.id}
                            className="flex items-center gap-4 border p-3 rounded"
                        >
                            <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                    src={imageUrl}
                                    alt={produto.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm">{produto.title}</h4>
                                <p className="text-sm text-gray-600">
                                    {Number(produto.price).toFixed(2)} €
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    removerDoCarrinho(produto.id);
                                    atualizar();
                                }}
                                className="text-red-600 hover:underline text-sm"
                            >
                                Remover
                            </button>
                        </li>
                    );
                })}
            </ul>

            <p className="font-bold text-xl mb-6">
                Total: {total.toFixed(2)} €
            </p>

            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="estudante"
                        checked={estudante}
                        onChange={(e) => setEstudante(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="estudante" className="text-sm font-medium">
                        Sou estudante DEISI (10% desconto)
                    </label>
                </div>

                <div>
                    <label htmlFor="cupao" className="block text-sm font-medium mb-1">
                        Cupão de desconto:
                    </label>
                    <input
                        type="text"
                        id="cupao"
                        value={cupao}
                        onChange={(e) => setCupao(e.target.value)}
                        placeholder="Insira o código do cupão"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={comprar}
                disabled={comprando}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {comprando ? "Processando..." : "💳 Comprar"}
            </button>
        </section>
    );
}

/*
export default function CarrinhoResumo() {
    const [produtos, setProdutos] = useState<Product[]>([]);

    function atualizar() {
        setProdutos(getCarrinho());
    }

    useEffect(() => {
        atualizar();
        window.addEventListener("storage", atualizar);
        return () => window.removeEventListener("storage", atualizar);
    }, []);

    const total = produtos.reduce((soma, p) => soma + Number(p.price), 0);

    if (produtos.length === 0) {
        return <p className="mt-6 text-gray-500">Carrinho vazio</p>;
    }

    return (
        <section className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">🧺 Carrinho</h2>
            <ul className="space-y-3">
                {produtos.map(produto => (
                    <li
                        key={produto.id}
                        className="flex justify-between items-center border p-3 rounded"
                    >
                        <span>
                            {produto.title} – {Number(produto.price).toFixed(2)} €
                        </span>

                        <button
                            onClick={() => {
                                removerDoCarrinho(produto.id);
                                atualizar();
                            }}
                            className="text-red-600 hover:underline"
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
            <p className="font-bold text-xl mt-4">
                Total: {total.toFixed(2)} €
            </p>
        </section>
    );
}
    */