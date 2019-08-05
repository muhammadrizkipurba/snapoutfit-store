import React from 'react'
import MyButton from "../utils/Buttons"
import { FaShippingFast, FaRegCheckCircle } from 'react-icons/fa';
import freeShippingIcon from "../utils/Images/icons/free-shipping.png";
import preOrderIcon from "../utils/Images/icons/pre-order.png";
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';


function ProductInfo(props) {
    const user = props.user
    const detail = props.detail

    const showProductTags = (detail) => (

        <div className="product_tags">
            { !detail.shipping ? 
                <div className="tag">
                    <img src={freeShippingIcon} style={{height: "50px"}} alt="shipping" />
                    <div className="tag_text pl-2">
                        <div>Free Shipping</div>
                        <div>and return</div>
                    </div>
                </div>
            :
                <div className="tag">
                    <FaShippingFast style={{color: "var(--mainGreen"}}/>
                    <div className="tag_text pl-3">
                        <div>Fast Shipping</div>
                        <div>and free return</div>
                    </div>
                </div>
            }
            { detail.available ?
                <div className="tag">
                    <FaRegCheckCircle style={{color: "var(--mainGreen)"}} />
                    <div className="tag_text pl-3">
                        <div>Stock Available</div>
                        <div>in store</div>
                    </div>
                </div>
            : 
                <div className="tag">
                    <img src={preOrderIcon} style={{height: "50px", padding:"1px"}} alt="shipping" />
                    <div className="tag_text pl-3">
                        <div>Not Available</div>
                        <div>Pre-Order only</div>
                    </div>
                </div>
            }
        </div>
    )

    const showAction = (detail,user) => {
        return (
            <div className="product_actions mb-5 border-0">
                <div className="price">
                    <h4 className="font-weight-bold text-uppercase">Product price : </h4>
                    <h3>{detail.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
                </div>
                <div className="action_title mt-5">
                    <MyButton
                        type="add_to_cart_link"
                        runAction={() => {
                            user.isAuth ?
                                props.addToCart(detail._id)
                                : setTimeout(() => {
                                    props.history.push('/signin')
                                }, 0);
                            Swal.fire({
                                imageUrl: "https://www.shareicon.net/data/256x256/2015/11/16/170905_exit_256x256.png",
                                imageAlt: "Access Denied",
                                imageHeight: "70px",
                                padding: "20px",
                                background: "#ded9d9",
                                backdrop: "rgba(0, 0, 0, 0.8)",
                                title: "Oopss..",
                                html:
                                    '<h5 class="font-weight-bold pt-4 text-dark">You must sign in to access the page</h5>' +
                                    '<p class="pt-2">Click OK to continue Sign In</p>',
                                showConfirmButton: true,
                                confirmButtonColor: "#1d8222",
                                confirmButtonClass: "mt-0 mb-2"
                            });
                        }}
                    />
                    <MyButton 
                        type="continue_shopping_link"
                        linkTo="/products"
                    />
                </div>
            </div>
        )
    }

    const showSpesification = (detail) => {
        return (
            <div className="product_spesifications">
                <h4 className="font-weight-bold text-uppercase">Spesification : </h4>
                <div>
                    <div className="item text-secondary">
                        <strong>Color : </strong> {detail.color.name}
                    </div> 
                </div>
            </div>
        )
    }

    return (
        <div className="pl-4 py-0">
            <h2>{detail.brand.name} - {detail.name}</h2>
            <h4 className="font-weight-bold text-uppercase border-top border-secondary pt-5 ">
                description : 
            </h4>
            <p className="text-secondary mb-3 pb-4">
                {detail.description}
            </p>
            { showSpesification(detail) }
            { showAction(detail,user) }
            { showProductTags(detail) }
        </div>
    )
}

export default withRouter(ProductInfo);
