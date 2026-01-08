import { Product } from "@/app/models/interfaces";

const CARRINHO_KEY = "deisi-shop-carrinho";

export function getCarrinho(): Product[] {
    if (typeof window === "undefined") return [];
    
    const data = localStorage.getItem(CARRINHO_KEY);
    if (!data) return [];
    
    try {
        const produtos = JSON.parse(data);
        // Garantir que price é número ao recuperar
        return produtos.map((p: any) => ({
            ...p,
            price: Number(p.price),
            rating: {
                rate: Number(p.rating?.rate || 0),
                count: Number(p.rating?.count || 0)
            }
        }));
    } catch {
        return [];
    }
}

export function adicionarAoCarrinho(produto: Product) {
    const carrinho = getCarrinho();
    
    const existe = carrinho.find(p => p.id === produto.id);
    if (existe) {
        alert("Produto já está no carrinho!");
        return;
    }
    
    const produtoNormalizado = {
        ...produto,
        price: Number(produto.price)
    };
    
    carrinho.push(produtoNormalizado);
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
    
    // Disparar evento para atualizar outros componentes
    window.dispatchEvent(new Event("storage"));
}

export function removerDoCarrinho(produtoId: number) {
    const carrinho = getCarrinho();
    const novoCarrinho = carrinho.filter(p => p.id !== produtoId);
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(novoCarrinho));
    
    // Disparar evento para atualizar outros componentes
    window.dispatchEvent(new Event("storage"));
}

export function limparCarrinho() {
    localStorage.removeItem(CARRINHO_KEY);
    window.dispatchEvent(new Event("storage"));
}