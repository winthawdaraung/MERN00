import { useState } from "react"
import { useProductStore } from "../store/product"
import "./CreatePage.css"

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
    });

    const { createProduct } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Stops default behavior
        const res = await createProduct(newProduct);
        if (res.success) {
            alert(res.message);
            setNewProduct({
                name: "",
                price: "",
                description: "",
                image: "",
            });
        } else {
            alert(res.message);
        }
    };
    

    return (
        <div className="create-page">
            <h1>Create Page</h1>
            <form className="create-page-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}/>  
                <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}/>
                <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}/>
                <input type="url" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}/>
                <button type="submit">Create</button>
            </form>

        </div>
    )
}

export default CreatePage;