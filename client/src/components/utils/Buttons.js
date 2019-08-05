import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaShoppingBag } from 'react-icons/fa'

const MyButton = props => {
  const buttons = () => {
    let template = "";

    switch (props.type) {
      case "default":
        template = (
          <Link
            className={!props.altClass ? "link_default mx-auto": props.altClass}  
            to={props.linkTo}
            {...props.addStyles}
          >
            {props.title}
          </Link>
        );
        break;

      case "add_to_cart_link":
        template = (
          <div 
            className="add_to_cart_link"
            onClick={() => props.runAction()}
          >
            <FaCartPlus />
            Add To Cart
          </div>
        );
        break;

      case "continue_shopping_link":
        template = (
          <Link
            className="continue_shopping_link"
            to={props.linkTo}
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>
        );
        break;

      case "addToCart_button":
        template = (
          <div
            className="addToCart_button"
            onClick={() => {
              props.runAction();
            }}
          >
            <FaCartPlus />
          </div>
        )
        break;
      default:
        template = "";
    }

    return template;
  };

  return <div className="button_link">{buttons()}</div>;
};

export default MyButton;
