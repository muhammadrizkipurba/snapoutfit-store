import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import userIcon from "../components/utils/Images/icons/user-account.svg";
import cartIcon from "../components/utils/Images/icons/cart.png";
import infoIcon from "../components/utils/Images/icons/info.png";
import siteInfoIcon from "../components/utils/Images/icons/site_info.png";
import addProductIcon from "../components/utils/Images/icons/add_product.png";
import manageCategotiesIcon from "../components/utils/Images/icons/manage_product.png";
import uploadIcon from "../components/utils/Images/icons/upload.png"

const links = [
    {
        name: "My Account",
        linkTo: '/dashboard',
        icon: userIcon
    },
    {
        name: "User Information",
        linkTo: '/user/edit_profile',
        icon: infoIcon
    },
    {
        name: "My Cart",
        linkTo: '/user/cart',
        icon: cartIcon
    },
]

const admin = [
    {
        name: 'Manage site info',
        linkTo: '/admin/site_info',
        icon: siteInfoIcon
    },
    {
        name: 'Add products',
        linkTo: '/admin/add_product',
        icon: addProductIcon
    },
    {
        name: 'Manage categories',
        linkTo: '/admin/manage_categories',
        icon: manageCategotiesIcon
    },
    {
        name: 'Upload file',
        linkTo: '/admin/add_file',
        icon: uploadIcon
    }
]

const UserLayout = props => {
  
  const generateLinks = links =>
    links.map((item, i) => (
      <NavLink key={i} className="acc_set_list" to={item.linkTo} activeClassName="active" >
        <img
          src={item.icon}
          style={{ width: "20px", marginRight: "4px" }}
          alt="icon"
        />{" "}
        {item.name}
      </NavLink>
    ));
  
  return (
    <div className="container pt-3">
      <div className="user_container mt-5 pt-5">
        <div className="user_left_nav">
          <div className="left_nav_title">
            <h4 className="font-weight-bolder m-0">ACCOUNT SETTING</h4>
          </div>
          <div className="links">{generateLinks(links)}</div>
          {props.user.userData.isAdmin ?
            <div>
              <div className="left_nav_title mt-5" >
                <h4 className="font-weight-bolder m-0">ADMIN</h4>
              </div>
              <div className="links">
                  {generateLinks(admin)}
              </div>
            </div>
            : null
          }
        </div>
        <div className="col col-lg-9 col-md-6">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(UserLayout));
