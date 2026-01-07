import Image from 'next/image';
import tecnologiasData from '@/app/data/tecnologias.json';

interface Tecnologia {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function Tecnologias() {
    const tecnologias: Tecnologia[] = JSON.parse(JSON.stringify(tecnologiasData));

    const renderStars = (rating: number) => {
        return '⭐'.repeat(rating);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Tecnologias Exploradas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tecnologias.map((tech, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex justify-center mb-4">
                            <Image 
                                src={`/tecnologias/${tech.image}`}
                                alt={`Logo ${tech.title}`}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-center mb-2">
                            {tech.title}
                        </h3>
                        
                        <p className="text-gray-600 text-center mb-4">
                            {tech.description}
                        </p>
                        
                        <div className="text-center text-2xl">
                            {renderStars(tech.rating)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}