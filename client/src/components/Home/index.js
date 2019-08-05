import React, { Component } from 'react'
import HomeSlider from './HomeSlider';
import { connect } from "react-redux";
import { getBestSellProducts, getNewArrivalProducts } from "../../actions/product_action";
import CardProducts from '../utils/card_products';
import OurBrands from './OurBrands';

class Home extends Component {
    
    componentDidMount() {
        this.props.dispatch(getBestSellProducts());
        this.props.dispatch(getNewArrivalProducts());
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardProducts 
                    list={this.props.products.newArrival}
                    title="NEW ARRIVAL"
                />
                <OurBrands />
                <CardProducts 
                    list={this.props.products.bestSell}
                    title="BEST SELL PRODUCTS"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);