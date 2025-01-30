import { useProductStore } from "../store/product"
import { useEffect } from "react"
import "./HomePage.css"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { deleteProduct, getProducts, products } = useProductStore();
    const navigate = useNavigate();
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleDelete = async (product) => {
        const res = await deleteProduct(product._id);
        if (res.success) {
            alert(res.message);
            getProducts();
        }
    }
    const handleUpdate = async (product) => {
        navigate(`/update/${product._id}`);
    }
    return (
        <div className="home-page">
            <div className="home-page-header">
                <h1>Home Page</h1>

            </div>
            <div>
                <p>Products</p>
                <div className="products-container">
                    {products?.map((product) => (
                        <div className="product-card" key={product._id}>
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name} />
                            <div className="product-card-price-description">
                                <p className="product-card-price">{product.price}</p>
                                {product.description && <p className="product-card-description">{product.description}</p>}
                            </div>
                            <div className="product-card-buttons">
                                <button onClick={() => handleDelete(product)}>Delete</button>
                                <button onClick={() => handleUpdate(product)}>Update</button>
                            </div>
                        </div>
                    ))}
                    {products?.length === 0 && <p>No products found</p> }
                </div>
            </div>
        </div>
    )
}

export default HomePage;
