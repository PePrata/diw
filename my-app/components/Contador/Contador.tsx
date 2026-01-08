"use client";

import { useEffect, useState } from "react";

const MIN = 0;
const MAX = 10;

export default function Contador() {
    const [valor, setValor] = useState<number>(0);
    const [historico, setHistorico] = useState<number[]>([]);

    // Carregar do localStorage
    useEffect(() => {
        const valorSalvo = localStorage.getItem("contador-valor");
        const historicoSalvo = localStorage.getItem("contador-historico");

        if (valorSalvo !== null) {
            setValor(Number(valorSalvo));
        }

        if (historicoSalvo) {
            setHistorico(JSON.parse(historicoSalvo));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("contador-valor", valor.toString());
        localStorage.setItem("contador-historico", JSON.stringify(historico));
    }, [valor, historico]);

    function atualizar(novoValor: number) {
        if (novoValor < MIN || novoValor > MAX) return;

        setValor(novoValor);
        setHistorico((prev) => [...prev, novoValor]);
    }

    function aumentar() {
        atualizar(valor + 1);
    }

    function diminuir() {
        atualizar(valor - 1);
    }

    function reset() {
        setValor(0);
        setHistorico([0]);
    }

    function corValor() {
        if (valor <= 3) return "text-red-600";
        if (valor <= 7) return "text-yellow-500";
        return "text-green-600";
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
                <span className={`text-6xl font-bold ${corValor()}`}>
                    {valor}
                </span>
            </div>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={diminuir}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    -
                </button>

                <button
                    onClick={reset}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Reset
                </button>

                <button
                    onClick={aumentar}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    +
                </button>
            </div>

            <div>
                <h2 className="font-semibold mb-2">Histórico:</h2>
                <ul className="list-disc list-inside space-y-1">
                    {historico.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
