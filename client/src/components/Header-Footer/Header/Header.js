import React, { Component } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";

import "./Header.css";

class Header extends Component {

  state = {
    publicLinks: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Shop",
        linkTo: "/products",
        public: true
      }
    ],

    privateLinks: [
      {
        name: "Cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "Account Setting",
        linkTo: "/dashboard",
        public: false
      },
      {
        name: "Sign out",
        linkTo: "/signout",
        public: false
      },
      {
        name: "Sign in",
        linkTo: "/signin",
        public: true
      }
    ]
  }
  
  signOutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if(response.payload.success){
        this.props.history.push('/signin')
      }
    })
  }

  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        <li className="router_link" key={i}>
          <NavLink exact to={item.linkTo} activeClassName="active" >
            {item.name}
          </NavLink>
          <span>{user.cart ? user.cart.length : 0}</span>
        </li>
      </div>
    )
  }

  defaultLink = (item, i) => (
    item.name === 'Sign out' ?
      <div className="signout_link" key={i} onClick={() => this.signOutHandler()}>  
        {item.name}
      </div>
    :
    <li className="router-link" key={i}>
      <NavLink exact to={item.linkTo} activeClassName="active" >
        {item.name}
      </NavLink>
    </li>
  )

  showNavbarLinks = (type) => {
    let list = [];

    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item)
          }
        } else {
          if (item.name !== 'Sign in') {
            list.push(item)
          }
        }
      });
    }

    return list.map((item, i) => {
      if(item.name !== "Cart"){
        return this.defaultLink(item, i)
      } else {
        return this.cartLink(item, i)
      }
    })
  }

  render() {
    return (
      <div>
        <nav>
          <div className="logo">
            <h3 className="text-uppercase mb-0">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Snapoutfit Store
              </Link>
            </h3>
          </div>
          <ul className="nav-links mb-0">
            {this.showNavbarLinks(this.state.publicLinks)}
            {this.showNavbarLinks(this.state.privateLinks)}
          </ul>
          
          <div className="burger" onClick={this.sidebarOpen}>
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withRouter(Header));
