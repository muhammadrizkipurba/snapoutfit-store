import React, { Component } from "react";
import { FaBars, FaTh } from "react-icons/fa";
import { getBrands, getColors, getProductsToDisplay } from "../../../actions/product_action";
import CollapseCheckbox from "../../utils/CollapseCheckbox";
import CollapseRadio from "../../utils/CollapseRadio";
import { connect } from "react-redux";
import { price } from "../../utils/Form/FixedCategories"
import PageTop from "../../utils/PageTop";
import LoadMoreCards from "../LoadMoreCards";

class ProductPage extends Component {
    
    state = {
        grid: "",
        limit:6,
        skip: 0,
        filters: {
            brand: [],
            color: [],
            price: []
        }
    };

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getColors());

        this.props.dispatch(getProductsToDisplay(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    };

    handlePrice = (value) => {
        const mainPrice = price;
        let arrMainPrice = [];

        for(let key in mainPrice){
            if(mainPrice[key]._id === parseInt(value,10)) {
                arrMainPrice = mainPrice[key].array
            }
        }
        return arrMainPrice;
    }
    
    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;

        if(category === "price") {
            let priceValue = this.handlePrice(filters);
            newFilters[category] = priceValue
        }

        this.showFilteredResult(newFilters)
        this.setState({ filters: newFilters })
    };

    showFilteredResult = (filters) => {
        this.props.dispatch(getProductsToDisplay(
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({ 
                skip: 0
            })
        })
    }

    loadMoreHandle = () => {
        let skip = this.state.skip + this.state.limit;
        this.props.dispatch(getProductsToDisplay(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toDisplay
        )).then( () => {
            this.setState({ skip })
        })

    }

    handleGridBars = () => {
        this.setState({ 
            grid: !this.state.grid ? 'grid_bars' : ""
        })
    }

    render() {
        const products = this.props.products;
        return (
            <div className="page_product_wrapper my-5 py-5">
                <PageTop />
                <div className="container mt-4">
                    <div className="shop_wrapper">
                        <div className="left mt-4">
                            <h4 className="filter_categories p-3 my-2">Filter Categories</h4>
                            <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters => this.handleFilters(filters, 'brand'))}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Colors"
                                list={products.colors}
                                handleFilters={(filters => this.handleFilters(filters, 'color'))}
                            />
                            <CollapseRadio
                                initState={false}
                                title="Price"
                                list={price}
                                handleFilters={(filters => this.handleFilters(filters, 'price'))}
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div 
                                        className={`grid_btn ${this.state.grid ? "" : "active"}`}
                                        onClick={() => this.handleGridBars()}
                                    >
                                        <FaTh />
                                    </div>
                                    <div 
                                        className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                                        onClick={() => this.handleGridBars()}
                                    >
                                        <FaBars />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <LoadMoreCards 
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.numberOfProduct}
                                    products={products.toDisplay}
                                    loadMore={ ()=> this.loadMoreHandle()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.products
    }
}

export default connect(mapStateToProps)(ProductPage);
