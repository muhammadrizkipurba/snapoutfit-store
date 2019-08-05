import React, { Component } from 'react'
import PageTop from '../../utils/PageTop';
import {connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../../actions/product_action';
import ProductInfo from '../ProductInfo';
import ProductImage from '../ProductImage';
import { addToCart } from '../../../actions/user_actions';


class ProductDetail extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response => {
            if(!this.props.products.productDetail){
                this.props.history.push("/404")
            }
        })
    }

    componentWillMount() {
        this.props.dispatch(clearProductDetail())
    }

    addToCartHandler = (id) => {
        this.props.dispatch(addToCart(id))
        
    } 

    render() {
        return (
            <div className="page_wrapper mt-5">
                <PageTop/>
                <div className="container mt-4">
                    {this.props.products.productDetail ? 
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{width: "500px", height: "444px"}} >
                                    <ProductImage detail={this.props.products.productDetail} />
                                </div>
                            </div>
                            <div className="right">
                                <ProductInfo 
                                    user={this.props.user.userData}
                                    detail={this.props.products.productDetail}
                                    addToCart ={ (id) => this.addToCartHandler(id) }
                                />
                            </div>
                        </div>
                    :'Loading'}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        products : state.products,
        user: state.user
    }
}

export default connect(mapStateToProps)(ProductDetail)
