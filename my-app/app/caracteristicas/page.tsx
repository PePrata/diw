export default function Caracteristicas() {
    const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
    ];

    return (
        <div>
            <h2>Características do React e Next.js</h2>
            <ul>
                {caracteristicas.map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                ))}
            </ul>
        </div>
    );
}