import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
    setProduct: (product) => set({ product }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
    getProducts: async () => {
        const res = await fetch("/api/products", {
            method: "GET"
        });
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        set((state) => ({ products: state.products.filter((product) => product.id !== id) }));
        if (data.success) {
            return { success: true, message: "Product deleted successfully" };
        } else {
            return { success: false, message: "Failed to delete product" };
        }
    },
    updateProduct: async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        set((state) => ({ products: state.products.map((product) => product.id === id ? data.data : product) }));
        return { success: true, message: "Product updated successfully" };
    },
    getProductById: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "GET"
        });
        const data = await res.json()
        console.log("FUNTIONS",data.data);
        set({ product: data.data });
    }   
}));



