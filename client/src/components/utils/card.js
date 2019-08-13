import React, { Component } from 'react'
import MyButton from './Buttons';
import { connect } from 'react-redux';
import { addToCart } from "../../actions/user_actions";
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

class Card extends Component {

    renderCardImage = (images) => {
        if(images.length > 0) {
            return images[0].url
        } else {
            return '/images/no-image.jpg'
        }
    }


    render() {
        const props = this.props;
        return (
                <div className={`card_item_wrapper ${props.grid}`}>
                    <div className="text-center">
                        <img
                            src={this.renderCardImage(props.images)}
                            className="d-inline-block"
                            style={{
                                height: "260px",
                                width: "200px",
                                verticalAlign: "middle"
                            }}
                            alt={props.name}
                        />
                    </div>
                    <div className="action_container">
                        <div className="tags">
                            <div className="brand">{props.brand.name}</div>
                            <div className="name">{props.name}</div>
                            <div className="price">{props.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                        </div>
                    
                    {props.grid ?
                        <div className="description">
                            {props.description}
                        </div>

                        : null
                    }
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton 
                                type="default"
                                altClass="card_link"
                                title="Details"
                                linkTo={`/product_detail/${props._id}`}
                                addStyles={{
                                    margin: "10px 0 0 0"
                                }}
                            />
                        </div> 
                        <div className="button_wrapp">
                            <MyButton 
                                type="addToCart_button"
                                runAction={() => {
                                    props.user.userData.isAuth ?
                                        this.props.dispatch(addToCart(props._id))
                                        : setTimeout(() => {
                                            this.props.history.push('/signin');
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
                                        }, 200);
                                }}
                            />
                        </div> 
                    </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(withRouter(Card));
