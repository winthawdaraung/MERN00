import { useState } from "react"
import { useProductStore } from "../store/product"
import "./CreatePage.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdatePage = () => {
    const { updateProduct, getProductById } = useProductStore();
    const { id } = useParams();
    const navigate = useNavigate();
    getProductById(id);
    const { product } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    useEffect(() => {
        getProductById(id);
    }, [getProductById, id]);
    console.log(product);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateProduct(id, updatedProduct);
        if (res.success) {
            alert(res.message);
            navigate('/');
        }
    }   
    return (
        <div className="create-page">
            <h1>Update Page</h1>
            <form className="create-page-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={updatedProduct.name} onChange={e => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>  
                <input type="number" placeholder="Price" value={updatedProduct.price} onChange={e => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                <input type="text" placeholder="Description" value={updatedProduct.description} onChange={e => setUpdatedProduct({...updatedProduct, description: e.target.value})}/>
                <input type="url" placeholder="Image URL" value={updatedProduct.image} onChange={e => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                <button type="submit">Update</button>
                <Link to="/">Cancel</Link>
            </form>
        </div>
    )
}

export default UpdatePage;