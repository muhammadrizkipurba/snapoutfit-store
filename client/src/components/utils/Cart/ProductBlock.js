import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

function ProductBlock({products, removeItem}) {
    
    const renderCartImage = (images) => {
        if( images.length > 0) {
            return images[0].url
        } else {
            return '/images/no-image.jpg'
        }
    }

    const renderItem = () => (
        products.cartDetail ?
            products.cartDetail.map(product => (
                <div className="user_product_block" key={product._id}>
                    <div className="item">
                        <div className="image" style={{background: `url(${renderCartImage(product.images)}) no-repeat`}} />
                    </div>
                    <div className="item" style={{width: "100px"}}>
                        <h4>Product Name</h4>
                        <div>
                            {product.brand.name} {product.name}
                        </div>
                    </div>
                    <div className="item" style={{width: "50px"}}>
                        <h4>Quantity</h4>
                        <div>
                            {product.quantity}
                        </div>
                    </div>
                    <div className="item" style={{width: "50px"}}>
                        <h4>Color</h4>
                        <div>
                            {product.color.name}
                        </div>
                    </div>
                    <div className="item" style={{width: "100px"}}>
                        <h4>Price</h4>
                        <div>
                            {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </div>
                    </div>
                    <div className="item" style={{width: "100px"}}>
                        <h4>Remove</h4>
                        <div 
                            className="cart_remove_btn"
                            onClick={() => removeItem(product._id)}
                        >
                                <FaTrashAlt />
                        </div>
                    </div>
                </div>
            ))
        : null
    )
    
    return (
      <div>
        {renderItem()}
      </div>
    );
}

export default ProductBlock
