"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
    const [hora, setHora] = useState<string>("");

    useEffect(() => {
        function atualizarHora() {
            const agora = new Date();
            const horaFormatada = agora.toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            setHora(horaFormatada);
        }

        // Atualiza imediatamente
        atualizarHora();

        // Atualiza a cada segundo
        const intervalo = setInterval(atualizarHora, 1000);

        // Cleanup
        return () => clearInterval(intervalo);
    }, []);

        return <span>{hora}</span>;
}
