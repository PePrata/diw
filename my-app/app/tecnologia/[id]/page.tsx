import Link from 'next/link';
import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard/TecnologiaDetailsCard';
import tecnologiasData from '@/app/data/tecnologias.json';

interface Tecnologia {
    title: string;
    image: string;
    description: string;
    rating: number;
}

interface PageProps {
    params: {
        id: string;
    };
}

export default function TecnologiaPage({ params }: PageProps) {
    const tecnologias: Tecnologia[] = tecnologiasData;
    const index = parseInt(params.id);
    const tecnologia = tecnologias[index];

    if (!tecnologia) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Tecnologia não encontrada</h1>
                <Link 
                    href="/tecnologias"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Voltar às Tecnologias
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link 
                    href="/tecnologias"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ← Voltar
                </Link>
            </div>

            <TecnologiaDetailsCard 
                title={tecnologia.title}
                image={tecnologia.image}
                description={tecnologia.description}
                rating={tecnologia.rating}
            />
        </div>
    );
}