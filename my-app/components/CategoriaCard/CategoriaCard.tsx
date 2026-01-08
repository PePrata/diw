import Link from "next/link";

export default function CategoriaCard({ categoria }: any) {
    return (
        <Link
            href={`/categorias/${categoria}`}
            className="border rounded p-6 text-center hover:bg-gray-100"
        >
            <img
                src={`/icons/${categoria}.png`}
                alt={categoria}
                className="h-16 mx-auto mb-2"
            />
            <h3 className="font-semibold">{categoria}</h3>
        </Link>
    );
}
