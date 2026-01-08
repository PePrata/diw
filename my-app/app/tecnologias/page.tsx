import Image from 'next/image';

import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';
import tecnologiasData from '@/app/data/tecnologias.json';

interface Tecnologia {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TecnologiasPage() {
    const tecnologias: Tecnologia[] = tecnologiasData;
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Tecnologias Exploradas</h2>
            
            <div className="flex flex-wrap justify-center gap-6">
                {tecnologias.map((tech, index) => (
                    <TecnologiaCard 
                        key={index}
                        title={tech.title}
                        image={tech.image}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}