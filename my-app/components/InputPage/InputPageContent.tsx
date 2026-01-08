"use client";

import { useState } from "react";

interface Tarefa {
    id: number;
    texto: string;
}

export default function InputPageContent() {
    /* INPUT DE TEXTO */
    const [texto, setTexto] = useState("");

    /* SELECTOR */
    const [categoria, setCategoria] = useState("React");

    const categorias = [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "CSS",
    ];

    /* LISTA DE TAREFAS */
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const [tarefaEditando, setTarefaEditando] = useState<number | null>(null);

    function adicionarTarefa() {
        if (!novaTarefa.trim()) return;

        setTarefas([
            ...tarefas,
            { id: Date.now(), texto: novaTarefa },
        ]);

        setNovaTarefa("");
    }

    function apagarTarefa(id: number) {
        setTarefas(tarefas.filter((t) => t.id !== id));
    }

    function iniciarEdicao(id: number, texto: string) {
        setTarefaEditando(id);
        setNovaTarefa(texto);
    }

    function salvarEdicao() {
        setTarefas(
            tarefas.map((t) =>
                t.id === tarefaEditando
                    ? { ...t, texto: novaTarefa }
                    : t
            )
        );

        setTarefaEditando(null);
        setNovaTarefa("");
    }

    return (
        <div className="max-w-xl mx-auto space-y-8">
            {/* INPUT DE TEXTO */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="font-semibold mb-2">Input de Texto</h2>

                <input
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Digite algo..."
                />

                <p className="mt-3">
                    <strong>Texto digitado:</strong> {texto}
                </p>
            </div>

            {/* SELECTOR */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="font-semibold mb-2">Selecionar Tecnologia</h2>

                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                >
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <p className="mt-3">
                    <strong>Selecionado:</strong> {categoria}
                </p>
            </div>

            {/* LISTA DE TAREFAS */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="font-semibold mb-4">Lista de Tarefas</h2>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        className="flex-1 border px-3 py-2 rounded"
                        placeholder="Nova tarefa..."
                    />

                    {tarefaEditando ? (
                        <button
                            onClick={salvarEdicao}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Salvar
                        </button>
                    ) : (
                        <button
                            onClick={adicionarTarefa}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Adicionar
                        </button>
                    )}
                </div>

                <ul className="space-y-2">
                    {tarefas.map((tarefa) => (
                        <li
                            key={tarefa.id}
                            className="flex justify-between items-center border p-2 rounded"
                        >
                            <span>{tarefa.texto}</span>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        iniciarEdicao(
                                            tarefa.id,
                                            tarefa.texto
                                        )
                                    }
                                    className="text-blue-600 hover:underline"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        apagarTarefa(tarefa.id)
                                    }
                                    className="text-red-600 hover:underline"
                                >
                                    Apagar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
