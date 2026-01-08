import Image from 'next/image';

interface TecnologiaDetailsCardProps {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TecnologiaDetailsCard({ title, image, description, rating }: TecnologiaDetailsCardProps) {
    const renderStars = (rating: number) => {
        return '⭐'.repeat(rating);
    };

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center">
                <div className="mb-6">
                    <Image 
                        src={`/tecnologias/${image}`}
                        alt={`Logo ${title}`}
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>
                
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                    {title}
                </h1>
                
                <div className="text-4xl mb-6">
                    {renderStars(rating)}
                </div>
                
                <div className="bg-white rounded-lg p-6 w-full shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">
                        Descrição
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
                
                <div className="mt-6 bg-white rounded-lg p-4 w-full shadow-md">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Avaliação:</span>
                        <span className="text-2xl">{renderStars(rating)}</span>
                    </div>
                    <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full"
                                style={{ width: `${(rating / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}