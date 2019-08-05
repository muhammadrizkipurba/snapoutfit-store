import React, { Component } from 'react';
import UserLayout from "../../highorder-components/UserLayout";
import { connect } from 'react-redux';
import noItemIcon from "../utils/Images/icons/no-item-cart.png";
import orderSuccess from "../utils/Images/icons/order-success.png";
import { getCartItems, removeCartItem, paymentSuccess } from '../../actions/user_actions';
import ProductBlock from '../utils/Cart/ProductBlock';
import Paypal from "../utils/Paypal";

class Cart extends Component {

    state = {
        loading: true,
        total: 0,
        totalDollar: 0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                this.props
                    .dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(() => {
                        if(this.props.user.cartDetail.length > 0) {
                            this.totalPrice(this.props.user.cartDetail);   
                        }
                    })
            }
        }

    }

    totalPrice = (cartDetail) => {
        let total = 0;
        let totalDollar = 0;

        cartDetail.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity
            totalDollar += parseInt(item.price, 10) * item.quantity * 0.000071
        });

        this.setState({total, totalDollar: Math.ceil(totalDollar), showTotal: true})
    };

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <img className="d-block mx-auto" src={noItemIcon} alt="no-item" style={{width: "150px"}}/> 
            <div className="no_item_message text-center">
                You have no item in Cart
            </div>
        </div>
    )

    removeFromCart = (id) => {
        this.props
            .dispatch(removeCartItem(id))
            .then(() => {
                if(this.props.user.cartDetail.length <= 0 ){
                    this.setState({
                        showTotal: false
                    })
                } else {
                    this.totalPrice(this.props.user.cartDetail)
                }
            })
    }

    transactionError = () => {
        console.log('Payment Error')
    }
    
    transactionCanceled = () => {
        console.log('Transaction Canceled')
    }

    transactionSuccess = (data) => {
        this.props.dispatch(paymentSuccess({ 
            cartDetail: this.props.user.cartDetail,
            paymentData: data
        })).then(() => {
            if(this.props.user.successPayment){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })

    }

    render() {
        return (
            <UserLayout>
                <div className="my_cart ">
                    <h2 className="text-center font-weight-bold">MY CART</h2>
                    <ProductBlock
                        products={this.props.user}
                        type="cart"
                        removeItem={id => this.removeFromCart(id)}
                    />
                    {this.state.showTotal ? (
                        <div className="user_cart_sum">
                            <div>
                                Total amount :{" "}
                                <span>
                                    {this.state.total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })} 
                                    <span> or </span> {" "}
                                    {this.state.totalDollar.toLocaleString("us-US", { style: "currency", currency: "USD" })}
                                </span>
                            </div>
                        </div>
                    ) :
                        this.state.showSuccess ?
                            <div className="cart_success">
                                <img className="d-block mx-auto mt-5" src={orderSuccess} alt="no-item" style={{ width: "200px" }} />
                                <div className="success_message mt-3">
                                    Your order has completed.
                                </div>
                                <div className="success_message">
                                    Go to "Account Setting -> My Account -> History Transaction"
                                </div>
                                <div className="success_message">
                                    to see the Order ID 
                                </div>
                            </div>
                        :
                        this.showNoItemMessage()
                    }

                {/* PAYPAL CHECKOUT */}
                {
                    this.state.showTotal ?
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.totalDollar}
                                transactionError={(data) => this.transactionError(data)}
                                transactionCanceled={(data) => this.transactionCanceled(data)}
                                onSuccess={(data) => this.transactionSuccess(data)}
                            />
                        </div>
                    :null
                }    

                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Cart)
