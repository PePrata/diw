import Contador from "@/components/Contador/Contador";

export default function ContadorPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                Contador
            </h1>

            <Contador />
        </div>
    );
}
