import { useState, useEffect } from "react";
import { useProductStore } from "../store/product";
import "./CreatePage.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
    const { updateProduct, getProductById, product } = useProductStore();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id);
    }, [id]);

    const [updatedProduct, setUpdatedProduct] = useState(product || {});

    useEffect(() => {
        setUpdatedProduct(product);
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateProduct(id, updatedProduct);
        alert(res.message);
        if (res.success) {
            navigate('/');
        }
    };

    return (
        <div className="create-page">
            <h1>Update Page</h1>
            <form className="create-page-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={updatedProduct?.name || ""} 
                    onChange={e => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>  
                <input type="number" placeholder="Price" value={updatedProduct?.price || ""} 
                    onChange={e => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                <input type="text" placeholder="Description" value={updatedProduct?.description || ""} 
                    onChange={e => setUpdatedProduct({...updatedProduct, description: e.target.value})}/>
                <input type="url" placeholder="Image URL" value={updatedProduct?.image || ""} 
                    onChange={e => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                <button type="submit">Update</button>
                <Link to="/">Cancel</Link>
            </form>
        </div>
    );
};

export default UpdatePage;
