import Image from 'next/image';
import Link from 'next/link';

interface TecnologiaCardProps {
    title: string;
    image: string;
    index: number;
}

export default function TecnologiaCard({ title, image, index }: TecnologiaCardProps) {
    return (
        <Link href={`/tecnologia/${index}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 w-64 h-64 flex flex-col items-center justify-center cursor-pointer hover:scale-105">
                <div className="flex justify-center items-center mb-4">
                    <Image 
                        src={`/tecnologias/${image}`}
                        alt={`Logo ${title}`}
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                
                <h3 className="text-xl font-bold text-center text-gray-800">
                    {title}
                </h3>
                
                <p className="text-sm text-blue-600 mt-2 font-semibold">
                    Ver detalhes →
                </p>
            </div>
        </Link>
    );
}